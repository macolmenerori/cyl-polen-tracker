import json
import os
import urllib.request
import urllib.error
from typing import Dict, List, Any


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    AWS Lambda function to fetch and structure pollen data from Castilla y León API.
    
    Args:
        event: Lambda event object containing request data
        context: Lambda context object
        
    Returns:
        API Gateway response with status code and body
    """
    
    # Valid stations list
    VALID_STATIONS = [
        "AVILA", "ARENAS", "BURGOS", "LEON", "MIRANDA", 
        "PALENCIA", "PONFERRADA", "SALAMANCA", "SEGOVIA", 
        "SORIA", "VALLADOLID", "ZAMORA"
    ]
    
    try:
        # Extract station parameter from query string (case-insensitive)
        query_params = event.get('queryStringParameters', {})
        if not query_params or 'station' not in query_params:
            return create_response(400, {"error": "Missing 'station' query parameter"})
        
        station = query_params['station'].upper()
        
        # Validate station
        if station not in VALID_STATIONS:
            return create_response(404, {"error": f"Station '{station}' not found. Valid stations: {', '.join(VALID_STATIONS)}"})
        
        # Get API URL from environment variable
        api_url = os.environ.get('API_URL')
        if not api_url:
            return create_response(500, {"error": "API_URL environment variable not configured"})
        
        # Build the API endpoint URL
        endpoint = f"{api_url}/api/explore/v2.1/catalog/datasets/informacion-polinica-actual/records?where=estaciones%20like%20%22{station}%22&limit=100"
        
        # Make the API request
        pollen_data = fetch_pollen_data(endpoint)
        
        # Structure the response
        structured_data = structure_pollen_data(pollen_data)
        
        # Return successful response
        return create_response(200, structured_data)
        
    except urllib.error.HTTPError as e:
        return create_response(502, {"error": f"Error fetching data from external API: {str(e)}"})
    except urllib.error.URLError as e:
        return create_response(502, {"error": f"Network error: {str(e)}"})
    except Exception as e:
        return create_response(500, {"error": f"Internal server error: {str(e)}"})


def fetch_pollen_data(url: str) -> Dict[str, Any]:
    """
    Fetch pollen data from the Castilla y León API.
    
    Args:
        url: The API endpoint URL
        
    Returns:
        Parsed JSON response from the API
    """
    with urllib.request.urlopen(url, timeout=10) as response:
        data = response.read()
        return json.loads(data.decode('utf-8'))


def structure_pollen_data(api_response: Dict[str, Any]) -> List[Dict[str, str]]:
    """
    Structure the pollen data into the desired format.
    
    Args:
        api_response: Raw API response from Castilla y León
        
    Returns:
        List of structured pollen data
    """
    results = api_response.get('results', [])
    
    structured_data = []
    for item in results:
        structured_data.append({
            "pollen_type": item.get('tipos_polinicos', ''),
            "level": item.get('prevision_proximos_dias', '')
        })
    
    return structured_data


def create_response(status_code: int, body: Any) -> Dict[str, Any]:
    """
    Create a properly formatted API Gateway response.
    
    Args:
        status_code: HTTP status code
        body: Response body (will be JSON serialized)
        
    Returns:
        Formatted response dictionary
    """
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',  # Enable CORS if needed
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        'body': json.dumps(body, ensure_ascii=False)
    }
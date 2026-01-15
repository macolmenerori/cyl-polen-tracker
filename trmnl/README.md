# cyl-polen-tracker for TRMNL

Pollen data directly on your [TRMNL](https://usetrmnl.com/) device.

## Motivation

I found it really interesting to see pollen levels on my TRMNL display, so I decided to build my own plugin (as for the moment, just a recipe).

As soon as I build the final plugin I'll update this file with the relevant info.

## Overview

The goal is to create a TRMNL plugin which displays the pollen levels for a given station. For this, I decided to build a custom API which receives the desired station as query param and returns the data on a very simplified way.

### API

This API functionality is very simple: take the data from Castilla y León [open data API](https://analisis.datosabiertos.jcyl.es), parse the most relevant one and return it.

I decided to create a Lambda Function in AWS, which with API Gateway can be turned into a fully functional REST API. It's very simple and convenient, and falls behind the AWS Free Tier.

You can find out how I built it on [aws_setup.md](aws_setup.md) file.

### Plugin

TBD

## Next step: set it up

You can find out how to set it up yourself in [aws_setup.md](aws_setup.md) file.

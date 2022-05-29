# OpenLayers Cartographic Label Style

## What

This style aims to make a feature-rich vector overlay on top of Tracestrack Carto
base map. Compared with pure raster style and pure vector style, this "hybrid"
approach has following benefits:

1. most time consuming rendering is still done at server side
2. preserving detailed mapnik-generated base map
3. enabling more sophisticated multi-language, region-specific rendering support
4. enabling better interaction with OSM object

## Vector tile source

Currently we are using vector tiles published from
[pnorman/openstreetmap-cartographic](https://github.com/pnorman/openstreetmap-cartographic). We
have plans to publish tiles from
[tracestrack/openstreetmap-cartographic](https://github.com/tracestrack/openstreetmap-cartographic)
in near future.

## Background map

Tracestrack Carto base map is used as background. A key is provisioned for
`http://localhost:8000` and
`https://tracestrack.github.io/OpenLayers-Cartographic-Label-Style`.

## How to run locally

1. Serve the folder using `python3 -m http.server`.
2. Open http://localhost:8000

## How to contribute

Ideas, issues and pull requests are all welcome.

## Legal and license

The code and cartography is licensed under CC0 as described in [LICENSE](LICENSE).

OpenStreetMap is a trademark of the OpenStreetMap Foundation, and is used with their permission. This project is not endorsed by or affiliated with the OpenStreetMap Foundation.

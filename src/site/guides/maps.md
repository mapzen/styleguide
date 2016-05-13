# checklist for maps

A good baseline guide is [Stamen's Checklist for Maps](http://content.stamen.com/stamens-checklist-for-maps), hereby incorporated by reference. Also: [There Should Be a Checklist for Maps](http://www.wired.com/2014/05/checklist-for-maps/) (WIRED).

## UI elements

- Zoom (Leaflet)
- Search (Pelias, etc.)
- Geolocation
- Bug (or "scarab")
- Style or variable switcher (e.g. dat-gui on Tangram demos)
- Attribution

## Attribution

```
[source / technology] | © OSM contributors | Mapzen
```

- Source/technology might be Leaflet (required by Leaflet.js), Mapbox GL, Tangram, etc. More than one source or technology should be separated by a pipe (`|`) character.
- Do not modify the "© OSM contributors" segment.
- Mapzen link should always be present and link to either the product site or the Mapzen main site.
- Styles should match the Leaflet default placement, size, text color, link color, link hover behavior, and other applicable styles, even for map rendering libraries (MapboxGL, D3, etc) that don't include attribution controls by default. These styles should never be modified without good reason.
- Attribution must never be hidden (this keeps us on good terms with the other contributors in the open source community we depend on)
- Attribution links must always open on top of a demo's parent tab or window (`target='_top'`) if it originated in an iframe. [Here is a script to add targets to links](https://github.com/mapzen/ui/blob/master/components/utils/iframe.anchors.js), which is useful for links that are added programatically, like Leaflet's default attribution link. Do not use `target='_blank'`, unless circumstances demand it. When in doubt, refer to [this article on when to use target="_blank"](https://css-tricks.com/use-target_blank/).
- Other links in an iframed demp may open on top of the parent tab or inside the iframe, depending on the circumstances. Again, avoid opening in a new window if you can help it.

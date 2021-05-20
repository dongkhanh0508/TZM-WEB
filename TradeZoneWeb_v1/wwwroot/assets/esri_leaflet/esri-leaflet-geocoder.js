esri - leaflet - geocoder - v2.3.3 - Fri May 29 2020 150140 GMT - 0500(Central Daylight Time)
Copyright(c) 2020 Environmental Systems Research Institute, Inc.
    Apache - 2.0
!function (e, t) { object == typeof exports && undefined != typeof modulet(exports, require(leaflet), require(esri - leaflet))function== typeof define && define.amddefine([exports, leaflet, esri - leaflet], t)t(((e = eself).L = e.L{}, e.L.esri = e.L.esri{}, e.L.esri.Geocoding = {}), e.L, e.L.esri) }(this, function (e, h, r) { use strict; var t = httpsgeocode.arcgis.comarcgisrestservicesWorldGeocodeServer, s = r.Task.extend({ pathfindAddressCandidates, params{ outSr4326, forStorage!1, outFields, maxLocations20 }, setters{ addressaddress, neighborhoodneighborhood, citycity, subregionsubregion, regionregion, postalpostal, countrycountry, textsingleLine, categorycategory, tokentoken, keymagicKey, fieldsoutFields, forStorageforStorage, maxLocationsmaxLocations, countriessourceCountry }, initializefunction(e){(e = e{}).url = e.urlt, r.Task.prototype.initialize.call(this, e)}, withinfunction(e){ return e = h.latLngBounds(e), this.params.searchExtent = r.Util.boundsToExtent(e), this}, nearbyfunction(e, t){ var s = h.latLng(e); return this.params.location = s.lng +,+ s.lat, this.params.distance = Math.min(Math.max(t, 2e3), 5e4), this}, runfunction(o, r){ return this.options.customParam && (this.params[this.options.customParam] = this.params.singleLine, delete this.params.singleLine), this.request(function (e, t) { var s = this._processGeocoderResponse, i = evoid 0s(t); o.call(r, e, { resultsi }, t) }, this) }, _processGeocoderResponsefunction(e){ for(var t = [], s=0; se.candidates.length; s++){ var i, o = e.candidates[s]; o.extent && (i = r.Util.extentToBounds(o.extent)), t.push({ texto.address, boundsi, scoreo.score, latlngh.latLng(o.location.y, o.location.x), propertieso.attributes }) } return t}}); function i(e) { return new s(e) } var o = r.Task.extend({ pathreverseGeocode, params{ outSR4326, returnIntersection!1}, setters{ distancedistance, languagelangCode, intersectionreturnIntersection }, initializefunction(e){(e = e{}).url = e.urlt, r.Task.prototype.initialize.call(this, e)}, latlngfunction(e){ var t = h.latLng(e); return this.params.location = t.lng +, +t.lat, this }, runfunction(i, o){ return this.request(function (e, t) { var s = evoid 0{ latlngh.latLng(t.location.y, t.location.x), addresst.address }; i.call(o, e, s, t) }, this) }}); function n(e) { return new o(e) } var a = r.Task.extend({ pathsuggest, params{}, setters{ texttext, categorycategory, countriescountryCode, maxSuggestionsmaxSuggestions }, initializefunction(e){(e = e{}).url(e.url = t, e.supportsSuggest = !0), r.Task.prototype.initialize.call(this, e)}, withinfunction(e){ var t = (e = (e = h.latLngBounds(e)).pad(.5)).getCenter(), s = e.getNorthWest(); return this.params.location = t.lng +, +t.lat, this.params.distance = Math.min(Math.max(t.distanceTo(s), 2e3), 5e4), this.params.searchExtent = r.Util.boundsToExtent(e), this }, nearbyfunction(e, t){ var s = h.latLng(e); return this.params.location = s.lng +, +s.lat, this.params.distance = Math.min(Math.max(t, 2e3), 5e4), this }, runfunction(s, i){ if (this.options.supportsSuggest) return this.request(function (e, t) { s.call(i, e, t, t) }, this); console.warn(this geocoding service does not support asking for suggestions)}}); function l(e) { return new a(e) } var u = r.Service.extend({ initializefunction(e) { (e = e{ }).url(r.Service.prototype.initialize.call(this, e), this._confirmSuggestSupport())(e.url = t, e.supportsSuggest = !0, r.Service.prototype.initialize.call(this, e))}, geocodefunction(){ return i(this) }, reversefunction(){ return n(this) }, suggestfunction(){ return l(this) }, _confirmSuggestSupportfunction(){ this.metadata(function (e, t) { e(t.capabilities && -1t.capabilities.indexOf(Suggest)this.options.supportsSuggest = !0this.options.supportsSuggest = !1, this.options.customParam = t.singleLineAddressField.name) }, this) }}); var d = h.Evented.extend({ options{ zoomToResult!0, useMapBounds12, searchBoundsnull }, initializefunction(e, t){ if(h.Util.setOptions(this, t), this._control = e,!t!t.providers!t.providers.length)throw new Error(You must specify at least one provider); this._providers = t.providers}, _geocodefunction(s, e, t){ var i, o = 0, r = [], n = h.Util.bind(function (e, t) { o--, e(t && (r = r.concat(t)), o = 0 && (i = this._boundsFromResults(r), this.fire(results, { resultsr, boundsi, latlngii.getCenter()void 0, texts }, !0), this.options.zoomToResult && i && this._control._map.fitBounds(i), this.fire(load))) }, this); if (e) o++, t.results(s, e, this._searchBounds(), n); else for (var a = 0; athis._providers.length; a++)o++, this._providers[a].results(s, e, this._searchBounds(), n) }, _suggestfunction(e){ var r = this._providers.length, n = 0, t = h.Util.bind(function (i, o) { return h.Util.bind(function (e, t) { if (--r, n += t.length, e) return this._control._clearProviderSuggestions(o), void this._control._finalizeSuggestions(r, n); if (t.length) for (var s = 0; st.length; s++)t[s].provider = o; else this._control._renderSuggestions(t); o._lastRender !== i && this._control._clearProviderSuggestions(o), t.length && this._control._input.value === i && (o._lastRender = i, this._control._renderSuggestions(t)), this._control._finalizeSuggestions(r, n) }, this) }, this); this._pendingSuggestions = []; for (var s = 0; sthis._providers.length; s++) { var i = this._providers[s], o = i.suggestions(e, this._searchBounds(), t(e, i)); this._pendingSuggestions.push(o) } }, _searchBoundsfunction(){ return null !== this.options.searchBoundsthis.options.searchBounds!1 !== this.options.useMapBounds && (!0 === this.options.useMapBoundsthis.options.useMapBounds=this._control._map.getZoom()) this._control._map.getBounds()null }, _boundsFromResultsfunction(e){ if (e.length) { for (var t = h.latLngBounds([0, 0], [0, 0]), s = [], i = [], o = e.length - 1; 0 = o; o--) { var r = e[o]; i.push(r.latlng), r.bounds && r.bounds.isValid() && !r.bounds.equals(t) && s.push(r.bounds) } for (var n = h.latLngBounds(i), a = 0; as.length; a++)n.extend(s[a]); return n } }, _getAttributionfunction(){ for (var e = [], t = this._providers, s = 0; st.length; s++)t[s].options.attribution && e.push(t[s].options.attribution); return e.join(,) }}); function c(e, t) { return new d(e, t) } var g = u.extend({ options{ labelPlaces and Addresses, maxResults5 }, suggestionsfunction(e, t, r){ var s = this.suggest().text(e); return t && s.within(t), this.options.countries && s.countries(this.options.countries), this.options.categories && s.category(this.options.categories), s.maxSuggestions(this.options.maxResults), s.run(function (e, t, s) { var i = []; if (!e) for (; s.suggestions.length && i.length= this.options.maxResults - 1;){ var o = s.suggestions.shift(); o.isCollectioni.push({ texto.text, unformattedTexto.text, magicKeyo.magicKey }) }r(e, i)}, this)}, resultsfunction(e, t, s, i){ var o = this.geocode().text(e); return t && o.key(t), o.maxLocations(this.options.maxResults), s && o.within(s), this.options.forStorage && o.forStorage(!0), this.options.countries && o.countries(this.options.countries), this.options.categories && o.category(this.options.categories), o.run(function (e, t) { i(e, t.results) }, this) }}); function p(e) { return new g(e) } var f = h.Control.extend({ includesh.Evented.prototype, options{ positiontopleft, collapseAfterResult!0, expanded!1, allowMultipleResults!0, placeholderSearch for places or addresses, titleLocation Search }, initializefunction(e){ h.Util.setOptions(this, e), e&& e.providers && e.providers.length((e = e{}).providers=[p()]),this._geosearchCore = c(this, e), this._geosearchCore._providers = e.providers, this._geosearchCore.addEventParent(this); for (var t = 0; tthis._geosearchCore._providers.length; t++)this._geosearchCore._providers[t].addEventParent(this); this._geosearchCore._pendingSuggestions = [], h.Control.prototype.initialize.call(this, e)}, _renderSuggestionsfunction(e){ var t, s, i; 0e.length && (this._suggestions.style.display = block); for (var o = [], r = 0; re.length; r++) { var n = e[r]; if (!i && 1this._geosearchCore._providers.length && t !== n.provider.options.label && ((i = h.DomUtil.create(div, geocoder - control - header, n.provider._contentsElement)).textContent = n.provider.options.label, i.innerText = n.provider.options.label, t = n.provider.options.label), s = sh.DomUtil.create(ul, geocoder - control - list, n.provider._contentsElement), -1 === o.indexOf(n.text)) { var a = h.DomUtil.create(li, geocoder - control - suggestion, s); a.innerHTML = n.text, a.provider = n.provider, a[data - magic - key] = n.magicKey, a.unformattedText = n.unformattedText }else for (var l = 0; ls.childNodes.length; l++)s.childNodes[l].innerHTML === n.text && (s.childNodes[l][data - magic - key] +=, +n.magicKey); o.push(n.text) } -1this.getPosition().indexOf(top) && (this._suggestions.style.maxHeight = this._map.getSize().y - this._suggestions.offsetTop - this._wrapper.offsetTop - 10 + px), -1this.getPosition().indexOf(bottom) && this._setSuggestionsBottomPosition() }, _setSuggestionsBottomPositionfunction(){ this._suggestions.style.maxHeight = this._map.getSize().y - this._map._controlCorners[this.getPosition()].offsetHeight - this._wrapper.offsetHeight + px, this._suggestions.style.top = -this._suggestions.offsetHeight - this._wrapper.offsetHeight + 20 + px }, _boundsFromResultsfunction(e){ if (e.length) { for (var t = h.latLngBounds([0, 0], [0, 0]), s = [], i = [], o = e.length - 1; 0 = o; o--) { var r = e[o]; i.push(r.latlng), r.bounds && r.bounds.isValid() && !r.bounds.equals(t) && s.push(r.bounds) } for (var n = h.latLngBounds(i), a = 0; as.length; a++)n.extend(s[a]); return n } }, clearfunction(){ this._clearAllSuggestions(), this.options.collapseAfterResult && (this._input.value =, this._lastValue =, this._input.placeholder =, h.DomUtil.removeClass(this._wrapper, geocoder - control - expanded)), !this._map.scrollWheelZoom.enabled() && this._map.options.scrollWheelZoom && this._map.scrollWheelZoom.enable() }, _clearAllSuggestionsfunction(){ this._suggestions.style.display = none; for (var e = 0; ethis.options.providers.length; e++)this._clearProviderSuggestions(this.options.providers[e]) }, _clearProviderSuggestionsfunction(e){ e._contentsElement.innerHTML =}, _finalizeSuggestionsfunction(e, t){ e(h.DomUtil.removeClass(this._input, geocoder - control - loading), -1this.getPosition().indexOf(bottom) && this._setSuggestionsBottomPosition(), tthis._clearAllSuggestions()) }, _setupClickfunction(){ h.DomUtil.addClass(this._wrapper, geocoder - control - expanded), this._input.focus() }, disablefunction(){ this._input.disabled = !0, h.DomUtil.addClass(this._input, geocoder - control - input - disabled), h.DomEvent.removeListener(this._wrapper, click, this._setupClick, this) }, enablefunction(){ this._input.disabled = !1, h.DomUtil.removeClass(this._input, geocoder - control - input - disabled), h.DomEvent.addListener(this._wrapper, click, this._setupClick, this) }, getAttributionfunction(){ for (var e = [], t = 0; tthis._providers.length; t++)this._providers[t].options.attribution && e.push(this._providers[t].options.attribution); return e.join(,) }, geocodeSuggestionfunction(e){ var t = e.targete.srcElement; t.classList.contains(geocoder - control - suggestions)t.classList.contains(geocoder - control - header)(t.classList.length1 && (t = t.parentNode), this._geosearchCore._geocode(t.unformattedText, t[data - magic - key], t.provider), this.clear()) }, onAddfunction(t){ r.Util.setEsriAttribution(t), this._map = t, this._wrapper = h.DomUtil.create(div, geocoder - control), this._input = h.DomUtil.create(input, geocoder - control - input leaflet - bar, this._wrapper), this._input.title = this.options.title, this.options.expanded && (h.DomUtil.addClass(this._wrapper, geocoder - control - expanded), this._input.placeholder = this.options.placeholder), this._suggestions = h.DomUtil.create(div, geocoder - control - suggestions leaflet - bar, this._wrapper); for (var e = 0; ethis.options.providers.length; e++)this.options.providers[e]._contentsElement = h.DomUtil.create(div, null, this._suggestions); var s = this._geosearchCore._getAttribution(); return t.attributionControl && t.attributionControl.addAttribution(s), h.DomEvent.addListener(this._input, focus, function (e) { this._input.placeholder = this.options.placeholder, h.DomUtil.addClass(this._wrapper, geocoder - control - expanded) }, this), h.DomEvent.addListener(this._wrapper, click, this._setupClick, this), h.DomEvent.addListener(this._suggestions, mousedown, this.geocodeSuggestion, this), h.DomEvent.addListener(this._input, blur, function (e) { this.clear() }, this), h.DomEvent.addListener(this._input, keydown, function (e) { var t = (e.targete.srcElement).value; h.DomUtil.addClass(this._wrapper, geocoder - control - expanded); for (var s, i = this._suggestions.querySelectorAll(.geocoder - control - suggestion), o = this._suggestions.querySelectorAll(.geocoder - control - selected)[0], r = 0; ri.length; r++)if (i[r] === o) { s = r; break } switch (e.keyCode) { case 13o(this._input.value = o.innerText, this._geosearchCore._geocode(o.unformattedText, o[data - magic - key], o.provider), this.clear())this.options.allowMultipleResults && 2=t.length(this._geosearchCore._geocode(this._input.value, void 0), this.clear())1 === i.length(h.DomUtil.addClass(i[0], geocoder - control - selected), this._geosearchCore._geocode(i[0].innerHTML, i[0][data - magic - key], i[0].provider))(this.clear(), this._input.blur()), h.DomEvent.preventDefault(e); break; case 38o && h.DomUtil.removeClass(o, geocoder - control - selected); var n = i[s - 1]; o && nh.DomUtil.addClass(n, geocoder - control - selected)h.DomUtil.addClass(i[i.length - 1], geocoder - control - selected), h.DomEvent.preventDefault(e); break; case 40o && h.DomUtil.removeClass(o, geocoder - control - selected); var a = i[s + 1]; o && ah.DomUtil.addClass(a, geocoder - control - selected)h.DomUtil.addClass(i[0], geocoder - control - selected), h.DomEvent.preventDefault(e); break; defaultfor(var l = 0; lthis._geosearchCore._pendingSuggestions.length; l++){ var u = this._geosearchCore._pendingSuggestions[l]; u && u.abort && !u.id && u.abort() } }}, this), h.DomEvent.addListener(this._input, keyup, h.Util.throttle(function (e) { var t = e.whiche.keyCode, s = (e.targete.srcElement).value; if (s.length2) return this._lastValue = this._input.value, this._clearAllSuggestions(), void h.DomUtil.removeClass(this._input, geocoder - control - loading); 27 !== t13 !== t && 38 !== t && 40 !== t && this._input.value !== this._lastValue && (this._lastValue = this._input.value, h.DomUtil.addClass(this._input, geocoder - control - loading), this._geosearchCore._suggest(s))this._clearAllSuggestions() }, 50, this), this), h.DomEvent.disableClickPropagation(this._wrapper), h.DomEvent.addListener(this._suggestions, mouseover, function (e) { t.scrollWheelZoom.enabled() && t.options.scrollWheelZoom && t.scrollWheelZoom.disable() }), h.DomEvent.addListener(this._suggestions, mouseout, function (e) { !t.scrollWheelZoom.enabled() && t.options.scrollWheelZoom && t.scrollWheelZoom.enable() }), this._geosearchCore.on(load, function (e) { h.DomUtil.removeClass(this._input, geocoder - control - loading), this.clear(), this._input.blur() }, this), this._wrapper}}); var v = r.FeatureLayerService.extend({ options{ labelFeature Layer, maxResults5, bufferRadius1e3, searchModecontain, formatSuggestionfunction(e) { return e.properties[this.options.searchFields[0]] } }, initializefunction(e){ r.FeatureLayerService.prototype.initialize.call(this, e), string== typeof this.options.searchFields && (this.options.searchFields = [this.options.searchFields]), this._suggestionsQuery = this.query(), this._resultsQuery = this.query()}, suggestionsfunction(e, t, n){ var s = this._suggestionsQuery.where(this._buildQuery(e)).returnGeometry(!1); return t && s.intersects(t), this.options.idField && s.fields([this.options.idField].concat(this.options.searchFields)), s.run(function (e, t, s) { if (e) n(e, []); else { this.options.idField = s.objectIdFieldName; for (var i = [], o = t.features.length - 1; 0 = o; o--) { var r = t.features[o]; i.push({ textthis.options.formatSuggestion.call(this, r), unformattedTextr.properties[this.options.searchFields[0]], magicKeyr.id }) } n(e, i.slice(0, this.options.maxResults)) } }, this) }, resultsfunction(e, t, s, a){ var i = this._resultsQuery; return t(delete i.params.where, i.featureIds([t]))i.where(this._buildQuery(e)), s && i.within(s), i.run(h.Util.bind(function (e, t) { for (var s = [], i = 0; it.features.length; i++) { var o, r, n = t.features[i]; n && (r = { latlng(o = this._featureBounds(n)).getCenter(), boundso, textthis.options.formatSuggestion.call(this, n), propertiesn.properties, geojsonn }, s.push(r), delete this._resultsQuery.params.objectIds) } a(e, s) }, this)) }, orderByfunction(e, t){ this._suggestionsQuery.orderBy(e, t) }, _buildQueryfunction(e){ for (var t = [], s = this.options.searchFields.length - 1; 0 = s; s--) { var i = 'upper(' + this.options.searchFields[s] + ')'; if (contain === this.options.searchMode) t.push(i + LIKE upper('%+e+%')); else if (startWith === this.options.searchMode) t.push(i + LIKE upper('+e+%')); else if (endWith === this.options.searchMode) t.push(i + LIKE upper('%+e+')); else { if (strict !== this.options.searchMode) throw new Error('L.esri.Geocoding.featureLayerProvider Invalid parameter for searchMode. Use one of contain, startWith, endWith, or strict'); t.push(i + LIKE upper('+e+')) } } return this.options.wherethis.options.where + AND(+t.join(OR) +)t.join(OR) }, _featureBoundsfunction(e){ var t = h.geoJson(e); if (Point !== e.geometry.type) return t.getBounds(); var s = t.getBounds().getCenter(), i = this.options.bufferRadius40075017360Math.cos(180Math.PIs.lat), o = this.options.bufferRadius40075017360; return h.latLngBounds([s.lat - o, s.lng - i], [s.lat + o, s.lng + i]) }}); var m = r.MapService.extend({ options{ layers[0], labelMap Service, bufferRadius1e3, maxResults5, formatSuggestionfunction(e) { return e.properties[e.displayFieldName] + small + e.layerName + small } }, initializefunction(e){ r.MapService.prototype.initialize.call(this, e), this._getIdFields() }, suggestionsfunction(e, t, h){ return this.find().text(e).fields(this.options.searchFields).returnGeometry(!1).layers(this.options.layers).run(function (e, t, s) { var i = []; if (!e) { var o = Math.min(this.options.maxResults, t.features.length); s.results = s.results.reverse(); for (var r = 0; ro; r++) { var n = t.features[r], a = s.results[r], l = a.layerId, u = this._idFields[l]; n.layerId = l, n.layerName = this._layerNames[l], n.displayFieldName = this._displayFields[l], u && i.push({ textthis.options.formatSuggestion.call(this, n), unformattedTextn.properties[n.displayFieldName], magicKeya.attributes[u]++l }) } } h(e, i.reverse()) }, this) }, resultsfunction(e, t, s, a){ var i, l, u=[]; return(t(i = t.split()[0], l = t.split()[1], this.query().layer(l).featureIds(i))this.find().text(e).fields(this.options.searchFields).layers(this.options.layers)).run(function (e, t, s) { if (!e) { s.results && (s.results = s.results.reverse()); for (var i = 0; it.features.length; i++) { var o, r, n = t.features[i]; l = ls.results[i].layerId, n && void 0 !== l && (o = this._featureBounds(n), n.layerId = l, n.layerName = this._layerNames[l], n.displayFieldName = this._displayFields[l], r = { latlngo.getCenter(), boundso, textthis.options.formatSuggestion.call(this, n), propertiesn.properties, geojsonn }, u.push(r)) } } a(e, u.reverse()) }, this)}, _featureBoundsfunction(e){ var t = h.geoJson(e); if (Point !== e.geometry.type) return t.getBounds(); var s = t.getBounds().getCenter(), i = this.options.bufferRadius40075017360Math.cos(180Math.PIs.lat), o = this.options.bufferRadius40075017360; return h.latLngBounds([s.lat - o, s.lng - i], [s.lat + o, s.lng + i]) }, _layerMetadataCallbackfunction(o){ return h.Util.bind(function (e, t) { if (!e) { this._displayFields[o] = t.displayField, this._layerNames[o] = t.name; for (var s = 0; st.fields.length; s++) { var i = t.fields[s]; if (esriFieldTypeOID === i.type) { this._idFields[o] = i.name; break } } } }, this) }, _getIdFieldsfunction(){ this._idFields = {}, this._displayFields = {}, this._layerNames = {}; for (var e = 0; ethis.options.layers.length; e++) { var t = this.options.layers[e]; this.get(t, {}, this._layerMetadataCallback(t)) } }}); var _ = u.extend({ options{ labelGeocode Server, maxResults5 }, suggestionsfunction(e, t, r){ if(this.options.supportsSuggest){ var s = this.suggest().text(e); return t && s.within(t), s.run(function (e, t, s) { var i = []; if (!e) for (; s.suggestions.length && i.length= this.options.maxResults - 1;){ var o = s.suggestions.shift(); o.isCollectioni.push({ texto.text, unformattedTexto.text, magicKeyo.magicKey }) } r(e, i)}, this)}return r(void 0, []), !1}, resultsfunction(e, t, s, i){ var o = this.geocode().text(e); return t && o.key(t), o.maxLocations(this.options.maxResults), s && o.within(s), o.run(function (e, t) { i(e, t.results) }, this) }}); e.ArcgisOnlineProvider = g, e.FeatureLayerProvider = v, e.Geocode = s, e.GeocodeService = u, e.GeocodeServiceProvider = _, e.Geosearch = f, e.GeosearchCore = d, e.MapServiceProvider = m, e.ReverseGeocode = o, e.Suggest = a, e.VERSION = 2.3.3, e.WorldGeocodingServiceUrl = t, e.arcgisOnlineProvider = p, e.featureLayerProvider = function (e) { return new v(e) }, e.geocode = i, e.geocodeService = function (e) { return new u(e) }, e.geocodeServiceProvider = function (e) { return new _(e) }, e.geosearch = function (e) { return new f(e) }, e.geosearchCore = c, e.mapServiceProvider = function (e) { return new m(e) }, e.reverseGeocode = n, e.suggest = l, Object.defineProperty(e, __esModule, { value!0})});
# sourceMappingURL = esri - leaflet - geocoder.js.map
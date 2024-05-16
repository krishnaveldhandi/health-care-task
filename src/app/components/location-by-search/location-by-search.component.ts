import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-location-by-search',
  standalone: true,
  imports: [ GoogleMapsModule,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './location-by-search.component.html',
  styleUrl: './location-by-search.component.scss',
})
export class LocationBySearchComponent implements AfterViewInit {
  @ViewChild('mapSearchField') searchField!: ElementRef;
  center: google.maps.LatLngLiteral = { lat: 17.385, lng: 78.4867 };
  zoom = 10;
  display: google.maps.LatLngLiteral = this.center;
  map!: google.maps.Map;
  autocomplete!: google.maps.places.Autocomplete;
  marker!: google.maps.Marker;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;

  ngAfterViewInit() {
    this.initMap();
    this.initAutocomplete();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
  }

  initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      const mapOptions: google.maps.MapOptions = {
        center: this.center,
        zoom: this.zoom,
      };
      this.map = new google.maps.Map(mapElement, mapOptions);

      this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          this.moveMap(event.latLng.toJSON());
        }
      });
    } else {
      console.error('Map element not found');
    }
  }

  initAutocomplete() {
    if (this.searchField.nativeElement) {
      const options: google.maps.places.AutocompleteOptions = {
        fields: ['geometry', 'name'],
      };
      this.autocomplete = new google.maps.places.Autocomplete(
        this.searchField.nativeElement,
        options
      );

      this.autocomplete.addListener('place_changed', () => {
        this.searchLocation();
      });
    } else {
      console.error('Search field element not found');
    }
  }

  searchLocation() {
    if (this.autocomplete) {
      const place = this.autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        this.display = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        this.center = this.display;
        this.zoom = 15;
        this.map.setCenter(this.center);
        this.map.setZoom(this.zoom);
        this.addMarker(this.display);
        this.calculateAndDisplayRoute(this.center);
      } else {
        alert('Please select a location from the suggestions.');
      }
    } else {
      console.error('Autocomplete not initialized');
    }
  }

  moveMap(location: google.maps.LatLngLiteral) {
    this.center = location;
    this.display = this.center;
    this.map.setCenter(this.center);

    if (this.marker) {
      this.marker.setMap(null);
    }

    this.addMarker(this.center);
    this.calculateAndDisplayRoute(this.center);
  }

  addMarker(location: google.maps.LatLngLiteral) {
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });
  }

  calculateAndDisplayRoute(destination: google.maps.LatLngLiteral) {
    const request: google.maps.DirectionsRequest = {
      origin: this.center,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }
}

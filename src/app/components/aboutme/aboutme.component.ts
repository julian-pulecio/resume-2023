import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent {
  ngAfterViewInit() {
    //We loading the player script on after view is loaded
    import('src/assets/js/cdn.credly.com_assets_utilities_embed.js');
  }
}

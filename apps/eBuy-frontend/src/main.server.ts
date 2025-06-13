import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
// import { renderApplication } from '@angular/platform-server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

// export const renderApp = () => renderApplication(bootstrap);

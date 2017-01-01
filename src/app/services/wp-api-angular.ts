
export * from './Posts';
export * from './Pages';
export * from './Comments';
export * from './Types';
export * from './Media';
export * from './Users';
export * from './Taxonomies';
export * from './Statuses';
export * from './Terms';


export interface WpApiAppConfig {
  baseUrl: string;
  namespace?: string;
}
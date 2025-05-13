import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   transpilePackages: [
    '@syncfusion/ej2',
    '@syncfusion/ej2-base',
    '@syncfusion/ej2-buttons',
    '@syncfusion/ej2-react-buttons',
    '@syncfusion/ej2-react-charts',
    '@syncfusion/ej2-react-dropdowns',
    '@syncfusion/ej2-react-grids',
    '@syncfusion/ej2-react-maps',     // Added maps package
    '@syncfusion/ej2-react-navigations',
    '@syncfusion/ej2-react-splitbuttons'
  ]
};

export default nextConfig;

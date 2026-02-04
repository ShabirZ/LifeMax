import { type RouteConfig, index } from "@react-router/dev/routes";

const routes: RouteConfig = [
  // Index route
  index("routes/LandingPage.tsx"),

  // Dashboard route
  {
    path: "/dashboard",
    file: "routes/Dashboard.jsx", 
  },
    // Signup route
  {
    path: "/signup",
    file: "routes/SignupPage.jsx",
  }
];

export default routes;

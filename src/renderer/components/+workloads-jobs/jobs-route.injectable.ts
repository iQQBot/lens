/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import isAllowedResourceInjectable from "../../../common/utils/is-allowed-resource.injectable";
import { Jobs } from "./jobs";
import { routeInjectionToken } from "../../routes/all-routes.injectable";

const jobsRouteInjectable = getInjectable({
  id: "jobs-route",

  instantiate: (di) => {
    const isAllowedResource = di.inject(isAllowedResourceInjectable);

    return {
      Component: Jobs,
      path: "/jobs",
      clusterFrame: true,
      mikko: () => isAllowedResource("jobs"),
    };
  },

  injectionToken: routeInjectionToken,
});

export default jobsRouteInjectable;

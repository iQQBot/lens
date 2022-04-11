/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import electronAppInjectable from "../../../app-paths/get-electron-app-path/electron-app/electron-app.injectable";
import { beforeApplicationIsReadyInjectionToken } from "../before-application-is-ready-injection-token";
import { onApplicationSoftQuitInjectionToken } from "../../on-application-soft-quit/on-application-soft-quit-injection-token";
import { runManyFor } from "../../run-many-for";

const setupClosingOfApplicationInjectable = getInjectable({
  id: "setup-closing-of-application",

  instantiate: (di) => {
    const app = di.inject(electronAppInjectable);

    const runManyForApplicationClose = runManyFor(di)(
      onApplicationSoftQuitInjectionToken,
    );

    return {
      run: () => {
        app.on("will-quit", async (event) => {
          await runManyForApplicationClose({ event });
        });
      },
    };
  },

  injectionToken: beforeApplicationIsReadyInjectionToken,
});

export default setupClosingOfApplicationInjectable;

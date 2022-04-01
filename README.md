# openshift-dd-ext
OpenShift Extension for Docker desktop

See API doc here: https://github.com/docker/extensions-sdk/tree/main/docs/dev/api

- Build with `make build-extension`
- install extension with `docker extension install fbricon/openshift-dd-extension`
- start local web server with `cd client; npm start`
- make extension use local web server with `docker extension dev ui-source fbricon/openshift-dd-extension http://localhost:3000`
- close and reopen Docker dashboard.
- changes to React code will be reflected in the UI on file save automagically.

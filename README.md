Modules for bttl
===

Usage
---

```
import {Workspace} from 'aaa';

ReactDOM.render(
  React.createElement(Workspace, {
    sts: sts,
    cmp: cmp,
    vkId: vkId,
    authKey: authKey,
    apiHost: '.'
  }),
  document.getElementById('example')
);
```


Build
---

```npm run build```

generates commonjs modules in a dist directory, using babeljs

to copy modules to local packages (without npm registry),
use ```cp-modules.sh```
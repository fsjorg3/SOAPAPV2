# PDF viewer regression checks

Run the automated checks from `frontend` with Node 24:

```sh
node --test tests/pdfviewer/regression.test.mjs
```

For visual checks, run the existing Vite dev server and open
`/tests/pdfviewer/index.html`. The harness imports the production viewer and
generates synthetic PDFs in memory; it does not change document assets.

- `mixed`: portrait, landscape, A4, legal-sized portrait and a rotated page.
- `landscapeFirst`: the same pages in reverse order.
- `single`: one portrait page.
- `long`: 50 pages, with only page 2 in landscape.

Check 25%, 100% and 300% zoom on desktop and a 390px mobile viewport. Colored
corner marks and blue frames must remain reachable by scrolling. Jump to the
middle and last pages; verify separation and the last page's bottom edge.
For `long`, zoom to 200% and jump to page 40: only nearby rows should be mounted,
and horizontal scroll width must remain 1584px even though page 2 is unmounted.
Closing, changing the document and reopening must reset page count, position
and zoom. Automated tests cover cancellation of pending dimension reads.

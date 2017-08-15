```jsx
<SmoothDisclosure
  isOpened={true | false}
  closedHeight={200}
  openedHeight={800}
  springConfig={{}}
  onToggle={() => {}}
  onAfterOpen={() => {}}
  onAfterClose={() => {}}
  className={{
    base: 'ReactSmoothDisclosure-wrapper',
    opening: 'is-opening',
    opened: 'is-opened',
    closing: 'is-closing',
    closed: 'is-closed',
  }}
  innerClassName={{
    base: 'ReactSmoothDisclosure-inner',
    opening: 'is-opening',
    opened: 'is-opened',
    closing: 'is-closing',
    closed: 'is-closed',
  }}

  {...wrapperAttrs}
>
  <p>lorem</p>
  <p>ipsum</p>
</SmoothDisclosure>
```

a11y example:

```jsx
<h1 id="heading"><button aria-controls="content">toggle</button></h1>
<SmoothDisclosure isOpened={isOpened} id="content" aria-labelledby="heading" aria-hidden={isOpened} aria-expanded={isOpened}>content</SmoothDisclosure>
```

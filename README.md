```jsx
<SmoothDisclosure
  isOpened={true | false}
  closedHeight={0}
  openedHeight={0}
  springConfig={{}}
  onRest={() => {}}
  components={{
    wrapper: 'div',
    inner: 'div',
  }}
  styles={{
    wrapper: {},
    inner: {},
  }}
  classNames={{
    wrapper: '',
    inner: '',
  }}

  {...wrapperAttrs}
>
  <p>lorem</p>
  <p>ipsum</p>
</SmoothDisclosure>
```

```jsx
<h1 id="heading"><button aria-controls="content">toggle</button></h1>
<SmoothDisclosure isOpened={isOpened} id="content" aria-labelledby="heading" aria-hidden={isOpened} aria-expanded={isOpened}>content</SmoothDisclosure>
```

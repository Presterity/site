This folder contains React (actually, Preact) components to render portions of
a page on the web site.

Most of these components include data fetched asynchronously, and React does
not have a built-in model for dealing with that. Our convention is to do this:

1. Instantiate the component with initial properties.
2. Ask the instance for its `asyncProperties` property, which should return
   a promise for all its async data. The component may ask other classes to
   provide promises, then aggregate those into a single promise return as the
   `asyncProperties` result.
3. When the `asyncProperties` promise resolves, merge the resulting properties
   with the initial properties to construct a final property set.
4. Render the component using the final property set.

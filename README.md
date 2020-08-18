# Introduction

react-announce-a11y allows you to have the screen reader announce messages to the user from your React based project. Great for things like searches, filtering, loading, and error messages. Can be done in JSX/TSX or from any code as long as it is initialized in JSX. It is written in Typescript so it has full typing.

# Getting Started

## Installation

`npm install react-announce-a11y`

## Usage

That is all you need to get started, just import and create the <ReactAnnounce /> component with the message:

```
import { ReactAnnounce } from "react-announce-a11y";
...
export class AnnounceExample extends React.Component<any> {
  render(){
    <div>
      ...
      <ReactAnnounce announceMessage={`Found ${items.length} items`} />
    </div>
  }
}
```

However, sometimes you need to announce from outside render. In that case you will need to first add <InstantiateGlobalAnnounce /> to a place that will always exist (such as app.tsx or app.jsx)

### Typescript Example

```
import { InstantiateGlobalAnnounce } from "react-announce-a11y";
...
// In a central render, such as in your app.tsx
export class App extends React.Component<any> {
  render(){
    <InstantiateGlobalAnnounce />
  }
}

// helper.ts
import { AnnounceMessage } from "react-announce-a11y";

function search(val: any, searchText: string) {
    return val !== null &&
        ['undefined'].indexOf(typeof val) === -1 &&
        JSON.stringify(val).toUpperCase().indexOf(searchText.toUpperCase()) !== -1;
}

export function filterByString(items: any[], searchText: string): any[] {
    if (!searchText) {
        return items;
    }

    const itemsFound = items.filter(row =>
        Object.keys(row).some(key =>
            search(row[key], searchText)));

    AnnounceMessage(`Found ${items.length} items`);

    return itemsFound;
}
```

### Javascript Example

```
// In a central render, such as in your app.tsx (or .jsx)
import { InstantiateGlobalAnnounce } from "react-announce-a11y";

...

export class App extends React.Component<any> {
  render(){
    <InstantiateGlobalAnnounce />
  }
}

// helper.ts
import { AnnounceMessage } from "react-announce-a11y";

function search(val, searchText) {
    return val !== null &&
        ['undefined'].indexOf(typeof val) === -1 &&
        JSON.stringify(val).toUpperCase().indexOf(searchText.toUpperCase()) !== -1;
}

export function filterByString(items, searchText){
    if (!searchText) {
        return items;
    }

    const itemsFound = items.filter(row =>
        Object.keys(row).some(key =>
            search(row[key], searchText)));

    AnnounceMessage(`Found ${items.length} items`);

    return itemsFound;
}
```

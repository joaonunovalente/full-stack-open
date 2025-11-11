# Exercise 0.6: New note in Single page app diagram

```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: status 201
    deactivate server


    Note right of browser: This time the server does not ask for a redirect, the browser stays <br> on the same page, and it sends no further HTTP requests.
    
```
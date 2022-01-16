import React from "react";

export default function Header() {
    return (
        <nav class="navbar">
            <div class="navbar-header">
                <h1>
                    <span class="navbar-brand">Boeing Speckle</span>
                </h1>
            </div>
            <div class="nav-links">
                <h2>
                    <a href="./index">Home</a>
                </h2>
                <h2>
                    <a href="./api">API</a>
                </h2>
                <h2>
                    <a href="./about">About</a>
                </h2>
            </div>
        </nav>
    );
}

# Global-webfont
English | [简体中文](./README.zh-hans.md)  

A tool for generating JavaScript code, designed to produce a Tampermonkey script that alters the default font of a website.
+ It doesn't load any online fonts, just modifies the CSS declarations.
+ For any declared font, ensure it's correctly installed on your computer, otherwise it won't take effect.

### Usage
1. In the `src/scss/var.scss` file, modify the font names corresponding to each language to your preference.
2. Run `npm run build`.
3. Copy the content of `index.js` from the `dist` directory into the Tampermonkey code box.

### Handling Special Cases
Some websites may enforce styles on certain DOM elements, making the default global CSS not of high enough priority to override the font.

For these sites that are not working, you can create a new subfolder inside the `specified` folder with the name of the domain name of the site that is not working.

For example: If the **comments** font on Youtube doesn't take effect, you should:
1. Create a new folder named `youtube.com` under the `specified` directory, which will match `*.youtube.com`.
2. Inside the `youtube.com` folder, create a new `index.scss` file.
3. If multiple websites use the same style, their URLs can be listed together and separated by a comma to name a folder, for example, using "youtube.com,google.com" as the folder name.
4. Use the browser's developer tools to identify which specific DOM's CSS is causing the global font to be ineffective.
5. Write the css/scss code in the newly created `index.scss` to override its original style.
6. Run `npm run build`.
7. Copy the content of `index.js` from the `dist` directory into the Tampermonkey code box.

### If you happen to like my font scheme, then you'll need to install the fonts in var.scss for the best experience!

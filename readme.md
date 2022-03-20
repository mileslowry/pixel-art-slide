# Pixel Art Web Comic - Art by Bryce Lowry

## Getting Started

Insert images into the panels folder. Number them 1.png, 2.png, etc. If you change the name of an image to a new number, the order will change. Avoid gaps and repeats, as both will result in errors.

In the story folder, write script in the script.txt file.

## Script Format:

Begin each new section like so:

\---

panel number & other panel number & other...etc

\---

Script text

\---

panel number & other panel number & other...etc

\---

More script text.

## Example Script

\---

1 & 2

\---

This text will appear for both images 1 & 2. Be sure to include a space between digits and '&' symbol. If text is for one image only, include only that digit.

## Panel Count

At the beginning of the script, you'll see PANEL_COUNT:num. Each time you insert or remove an image, replace the panel count to accurately represent the number of images (not the number of lines of text). Failure to do this will result in errors and possibly trigger the apocalypse.

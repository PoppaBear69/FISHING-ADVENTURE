---
title: "Photos & Videos"
layout: layout.html
permalink: /photos/
---

## Photos & Videos

### 📸 Photos
<div class="gallery">
    {% for image in collections.images %}
        <img src="{{ image.url }}" alt="Fishing Adventure Photo" class="gallery-item">
    {% endfor %}
</div>

### 🎥 Videos
<div class="videos">
    <video controls>
        <source src="/videos/video1.mp4" type="video/mp4">
    </video>
    <video controls>
        <source src="/videos/video2.mp4" type="video/mp4">
    </video>
    <video controls>
        <source src="/videos/video3.mp4" type="video/mp4">
    </video>
</div>

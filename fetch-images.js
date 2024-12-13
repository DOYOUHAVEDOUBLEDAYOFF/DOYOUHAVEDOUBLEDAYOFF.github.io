async function fetchImages() {
    const gallery = document.getElementById('image-gallery');
    const pagination = document.getElementById('pagination');
    const jsonUrl = 'https://the1-1209.github.io/imageskeeper/new%20floder/images.json';
    const imagesPerPage = 6; // 每页显示的图片数量

    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        // 使用 response.json() 获取 JSON 数据
        const data = await response.json();
        console.log('Data:', data.images);

        // 确保 data.images 存在并且是一个数组
        if (data.images && Array.isArray(data.images)) {
            const images = data.images;
            let currentPage = 1;

            function displayImages(page) {
                gallery.innerHTML = ''; // 清空当前画廊内容
                const start = (page - 1) * imagesPerPage;
                const end = start + imagesPerPage;
                const pageImages = images.slice(start, end);

                pageImages.forEach(image => {
                    const imageElement = document.createElement('img');
                    imageElement.src = image.url;
                    imageElement.alt = image.fileName;

                    const anchorElement = document.createElement('a');
                    anchorElement.href = image.url;
                    anchorElement.appendChild(imageElement);

                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.appendChild(anchorElement);

                    gallery.appendChild(galleryItem);
                });

                updatePaginationControls(images.length, page);
            }

            function updatePaginationControls(totalImages, currentPage) {
                const totalPages = Math.ceil(totalImages / imagesPerPage);
                const prevButton = document.getElementById('prev-button');
                const nextButton = document.getElementById('next-button');

                prevButton.disabled = currentPage <= 1;
                nextButton.disabled = currentPage >= totalPages;
            }

            function setupPaginationControls() {
                const prevButton = document.createElement('button');
                prevButton.id = 'prev-button';
                prevButton.textContent = '上一页';
                prevButton.addEventListener('click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        displayImages(currentPage);
                    }
                });

                const nextButton = document.createElement('button');
                nextButton.id = 'next-button';
                nextButton.textContent = '下一页';
                nextButton.addEventListener('click', () => {
                    const totalPages = Math.ceil(data.images.length / imagesPerPage);
                    if (currentPage < totalPages) {
                        currentPage++;
                        displayImages(currentPage);
                    }
                });

                pagination.appendChild(prevButton);
                pagination.appendChild(nextButton);
            }

            setupPaginationControls();
            displayImages(currentPage);
        } else {
            console.error('Invalid JSON structure: images array not found');
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

fetchImages();




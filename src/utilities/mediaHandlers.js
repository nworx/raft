const openLocalFilePicker = (accept) => {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = accept;

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) return reject('No file selected');
            resolve(file);
        };

        input.click();
    });
};

export const handleImageInsert = async () => {
    const file = await openLocalFilePicker('image/*');
    const objectURL = URL.createObjectURL(file);

    return {
        type: 'image',
        attrs: {
            src: objectURL,
            alt: file.name,
        },
    };
};

export const handleGIFInsert = async () => {
    const file = await openLocalFilePicker('image/gif');
    const objectURL = URL.createObjectURL(file);
    return {
        type: 'image',
        attrs: {
            src: objectURL,
            alt: file.name,
        },
    };
};

export const handleFileAttach = async () => {
    const file = await openLocalFilePicker('*');
    const objectURL = URL.createObjectURL(file);

    return {
        type: 'paragraph',
        content: [
            {
                type: 'text',
                text: ` `,
            },
            {
                type: 'text',
                marks: [
                    {
                        type: 'link',
                        attrs: {
                            href: objectURL,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                        },
                    },
                ],
                text: file.name,
            },
        ],
    };
};  
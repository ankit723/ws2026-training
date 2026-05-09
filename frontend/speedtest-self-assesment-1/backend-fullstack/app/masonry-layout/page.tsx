'use client'

import Image from "next/image"

type ImageItem = {
    src: string
    height: number
}

export default function Page() {

    const images: ImageItem[] = []
    for (let i = 1; i <= 400; i++) {

        images.push({
            src: `/images/${i}.jpg`,
            height: Math.floor(Math.random() * 300) + 200
        })
    }

    // 4 masonry columns
    const columns: ImageItem[][] = [[], [], [], []]

    // Track total height of each column
    const columnHeights = [0, 0, 0, 0]

    // Masonry balancing logic
    images.forEach((img) => {

        // Find shortest column
        let smallestColumn = 0
        let smallestHeight = columnHeights[0]

        for (let i = 1; i < 4; i++) {

            if (columnHeights[i] < smallestHeight) {
                smallestHeight = columnHeights[i]
                smallestColumn = i
            }
        }

        // Push image into shortest column
        columns[smallestColumn].push(img)

        // Update column height
        columnHeights[smallestColumn] += img.height
    })

    return (

        <div className="w-screen min-h-screen p-4">

            <div className="flex gap-4 items-start">

                {columns.map((column, columnIndex) => (

                    <div
                        key={columnIndex}
                        className="flex flex-col gap-4 flex-1"
                    >

                        {column.map((img, imgIndex) => (

                            <Image
                                key={`${columnIndex}-${imgIndex}`}
                                src={img.src}
                                alt="image"
                                width={500}
                                height={img.height}
                                className="w-full h-auto rounded-lg"
                                unoptimized
                            />

                        ))}

                    </div>

                ))}

            </div>

        </div>
    )
}
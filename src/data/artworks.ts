export type Artwork = {
    id: number
    slug: string
    title: string
    iconImage: string
    fullImage: string
    description?: string
    year?: number
    medium?: string

    // inventory
    prints?: {
        size: string //e.g., "4x6", "8x10", "11x14"
       stock: number
       price?: number 
    }[]

    original?: {
        available: boolean
        price?: number
        dimensions?: string // e.g., "16x20 inches"
    }

    merch?: {
        antiGreetingCards?: {
            slug: string
            title: string
            stock: number
            price?: number
            image: string
            dimensions?: string
        }[]
        stickers?: {
            slug: string
            title: string
            stock: number
            price?: number
            image: string
            dimensions?: string
        }[]
    }  
}

export const artworks: Artwork[] = [

    /* #1: WOODSCAPE 1 */
    {
        id: 1,
        slug: 'woodscape1',
        title: 'woodscape 1',
        iconImage: '/art/woodscape1-icon.png',
        fullImage: '/art/woodscape1-large.jpg', 

        prints: [
            { size: '11x8.5 (right side)', stock: 5, price: 15 },
            { size: '5.5x17 (full)', stock: 2, price: 15 },
        ]
    },

    /* #2: AMETHYST 3 */
    {
        id: 2,
        slug: 'amethyst3',
        title: 'amethyst 3',
        iconImage: '/art/amethyst3-icon.png',
        fullImage: '/art/amethyst3.jpg',
    },

    /* #3: CAMILA */
    {
        id: 3,
        slug: 'camila',
        title: 'camila',
        iconImage: '/art/camila-icon.png',
        fullImage: '/art/camila-hdscan.jpeg',

        prints: [
            { size: '11x8.5', stock: 1, price: 15 },
        ],
    },

    /* #4: CAPRICORN ORANGE */
    {
        id: 4,
        slug: 'capricorn-orange',
        title: 'capricorn orange',
        iconImage: '/art/capricornorange-icon.png',
        fullImage: '/art/capricorn-orange.jpeg',

        prints: [
            { size: '2.25x3.5', stock: 5, price: 2 },
            { size: '4.5x6.75', stock: 1, price: 8 }
        ],

        original: {
            available: false,
        },

        merch: {
            antiGreetingCards: [
                {
                    slug: 'trench-card',
                    title: 'you belong in a trench',
                    stock: 4,
                    price: 5,
                    image: '/merch/trenchcard.jpg',
                    dimensions: '4x5 inches',
                }
            ]   
        }
    },

    /* #5: SKETCH 1 (GREEN GIANT?) */
    {
        id: 5,
         slug: 'sketch1',
        title: 'sketch 1',
        iconImage: '/art/sketch1-scan-icon.jpeg',
        fullImage: '/art/sketch1-scan.jpeg',
    },

    /* #6: GOATS ON THE POND */
    {
        id: 6,
        slug: 'goats-on-the-pond',
        title: 'goats on the pond',
        iconImage: '/art/goatsonthepond-icon.png',
        fullImage: '/art/goatsonthepond-scan.jpeg',

        prints: [
            { size: '8.5x11', stock: 3, price: 15 },
        ]
       
    },

    /* #7: LOTUS */
    {
        id: 7,
        slug: 'lotus',
        title: 'lotus',
        iconImage: '/art/lotus-icon.png',
        fullImage: '/art/lotus.jpg',

        prints: [
            { size: '5x5', stock: 6, price: 3 },
        ],

        original: {
            available: true,
            dimensions: '8x8 inches'
        }
    },

    /* #8: LOVE WREN */
    {
        id: 8,
        slug: 'love-wren',
        title: 'love wren',
        iconImage: '/art/lovewren-icon.png',
        fullImage: '/art/lovewren.png',

        prints: [
            { size: '8.5x11', stock: 2, price: 15 },
        ]
    },

    /* #9: MADEL1NE */
    {
        id: 9,
        slug: 'madel1ne',
        title: 'madel1ne',
        iconImage: '/art/madel1ne-icon.png',
        fullImage: '/art/madeline.png',

        prints: [
            { size: '7x7', stock: 1, price: 13 },
        ]
    },

    /* #10: MEA CULPA */
    {
        id: 10,
        slug: 'mea-culpa',
        title: 'mea culpa',
        iconImage: '/art/meaculpa-icon.png',
        fullImage: '/art/meaculpa.png',

        prints: [
            { size: '7x7', stock: 1, price: 13 },
        ],

        original: {
            available: false,
            dimensions: '8x8 inches'
        }
    },

    /* #11: NIGHTSCAPE 2 */
    {
        id: 11,
        slug: 'nightscape2',
        title: 'nightscape 2',
        iconImage: '/art/nightscape2-icon.png',
        fullImage: '/art/nightscape2.jpg',

        prints: [
            { size: '11x8.5', stock: 4, price: 15 },
        ]
    },

    /* #12: SCIA 2 */
    {
        id: 12,
        slug: 'scia2',
        title: 'scia 2',
        iconImage: '/art/scia2-icon.png',
        fullImage: '/art/scia2.jpeg',

        prints: [
            { size: '8.5x11', stock: 1, price: 15 },
        ]
    },

    /* #13: KIRAMONA */
    {
        id: 13,
        slug: 'kiramona',
        title: 'kiramona',
        iconImage: '/art/kiramona-icon.png',
        fullImage: '/art/kiramonaLARGE.jpg',

        prints: [
            { size: '8.5x11', stock: 2, price: 15 },
            { size: '11x17', stock: 4, price: 20 }
        ]
       
    },

    /* #14: WINK FACE */
    {
        id: 14,
        slug: 'wink-face',
        title: 'wink face',
        iconImage: '/art/wink_face-icon.jpeg',
        fullImage: '/art/wink_face.jpeg',
    },

    /* #15: A WALK */
    {
        id: 15,
        slug: 'a-walk',
        title: 'a walk',
        iconImage: '/art/awalk-icon.png',
        fullImage: '/art/a_walk.jpg',
        year: 2021,
        medium: 'acrylic and ink on canvas',
        
        prints: [
            { size: '4x6', stock: 1, price: 4 },
            { size: '2x4', stock: 0, price: 2 },
        ],

        original: {
            available: false,
            dimensions: '12x16 inches'
        } 
    },

    /* #16: OUTCAST */
    {
        id: 16,
        slug: 'outcast',
        title: 'outcast',
        iconImage: '/art/outcast-icon.png',
        fullImage: '/art/outcast.png',
        year: 2022,
        medium: 'acrylic and ink',

        prints: [
            { size: '11x8.5', stock: 1, price: 15 },
            { size: '12x9', stock: 1, price: 20 },
        ],

        merch: {
            antiGreetingCards: [
                {
                    slug: 'see-you-never-postcard',
                    title: 'see you never',
                    stock: 8,
                    price: 5,
                    image: '/merch/outcast-postcard.jpg',
                    dimensions: '3.5x5.5 inches',
                }
            ]
        }
    },

   /* #17: OBSIDIAN SHARD */
    {
        id: 17,   
        slug: 'obsidian-shard',
        title: 'obsidian shard',
        iconImage: '/art/obsidianshard-icon.png',
        fullImage: '/art/obsidianshard.JPG',
        year: 2018,
        medium: 'acrylic and ink',

        merch: {
            antiGreetingCards: [
            {
                slug: 'wishing-you-the-worst-card',
                title: 'wishing you the worst',
                stock: 4,
                price: 5,
                image: '/merch/wishing-worst.jpg',
                dimensions: '4x5 inches',
            }
            ]
        }
    },

    /* #18: WOODSCAPE 3 */
    {
        id: 18,
        slug: 'woodscape3',
        title: 'woodscape 3',
        iconImage: '/art/woodscape3-icon.png',
        fullImage: '/art/woodscape3.jpg',
        medium: 'acrylic and ink on wood',

        prints: [
            { size: '8.5x11', stock: 2, price: 15 },
            { size: '11x17', stock: 1, price: 20 }
        ],

        merch: {
            antiGreetingCards: [
                {
                    slug: 'soon-youll-be-sorry',
                    title: 'soon youll be sorry',
                    stock: 4,
                    price: 5,
                    image: '/merch/soon-sorry.jpg',
                    dimensions: '4x5 inches',
                }
            ]
        }
    },

    /* #19: SELENE */
    {
        id: 19,
        slug: 'selene',
        title: 'selene',
        iconImage: '/art/selene-icon.png',
        fullImage: '/art/selene.jpg',
        year: 2020,
        medium: 'acrylic and ink on canvas',

        prints: [
            { size: '8.5x11', stock: 1, price: 10 },
        ],

        merch: {
            antiGreetingCards: [
                {
                    slug: 'dont-get-well-soon-card',
                    title: "do not get well soon",
                    stock: 4,
                    price: 5,
                    image: '/merch/dontgetwellsoon.jpg',
                    dimensions: '4x5 inches',
                }
            ]
        },

    },

    /* #20: CITY GIRL */
    {
        id: 20,
        slug: 'city-girl',
        title: 'city girl',
        iconImage: '/art/citygirl-icon.png',
        fullImage: '/art/citygirl.jpg',
        medium: 'acrylic and pen on canvas',

        prints: [
            { size: '4.75x6.5 (yellow)', stock: 1, price: 4 },
        ],
    },

    /* #21: OBSIDIAN MIRROR */
    {
        id: 21,
        slug: 'obsidian-mirror',
        title: 'obsidian mirror',
        iconImage: '/art/obsidianmirror-icon.png',
        fullImage: '/art/obsidianlarge.jpg',
        medium: 'acrylic and ink on canvas',
        year: 2018,

        prints: [
            { size: '8.5x11', stock: 7, price: 15 },
        ]
    },

    /* #22: MORGANA */
    {
        id: 22,
        slug: 'morgana',
        title: 'morgana',
        iconImage: '/art/morgana-icon.png',
        fullImage: '/art/morgana.jpg',
        medium: 'acrylic and ink on wood',
        year: 2017,

        prints: [
            { size: '8.5x11', stock: 3, price: 15 },
        ]
    },

    /* #23: CAMILA AND CHARLIE */
    {
        id: 23,
        slug: 'camila-and-charlie',
        title: 'camila and charlie',
        iconImage: '/art/camilacharlie-icon.png',
        fullImage: '/art/camilacharlie.jpg',
        medium: 'acrylic and ink on canvas',
        year: 2019,

        prints: [
            { size: '8.5x11', stock: 2, price: 15 },
        ]
    },

    /* #24: WREN */
    {
        id: 24,
        slug: 'wren',
        title: 'wren',
        iconImage: '/art/wren-icon.png',
        fullImage: '/art/wren.jpg',
        medium: 'acrylic and ink on wood',
        year: 2021,

        prints: [
            { size: '8.5x11', stock: 2, price: 15 },
        ]
    },

    /* #25: CHLOE */
    {
        id: 25, 
        slug: 'chloe',
        title: 'chloe (life is strange)',
        iconImage: '/art/chloe-icon.png',
        fullImage: '/art/chloe.jpg',
        medium: 'acrylic, ink, and heart glitter on canvas',
        year: 2022,

        prints: [
            { size: '8.5x11', stock: 1, price: 15 },
        ],

    },

    /* #26: ALTA V ALTA */
    {
        id: 26,
        slug: 'alta-v-alta',
        title: 'alta v alta',
        iconImage: '/art/alta-icon.png',
        fullImage: '/art/alta.jpg',
        medium: 'acrylic and ink on canvas',
        year: 2019,

        prints: [
            { size: '11x17', stock: 2, price: 20 },
        ]
    },

    /* #27: EMI DRAGON */
    {
        id: 27, 
        slug: 'emi-dragon',
        title: 'emi dragon',
        iconImage: '/art/emidragon-icon.png',
        fullImage: '/art/emidragon.jpg',
        medium: 'acrylic and ink on canvas',
        year: 2019,

        prints: [
            { size: '11x17', stock: 1, price: 20 },
        ]
    }



 







]
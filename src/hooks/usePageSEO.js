import { useEffect } from "react";

const usePageSEO = ({
    title,
    description,
    keywords = [],
    canonical,
    img, // إضافة img
    url // إضافة url
}) => {
    useEffect(() => {
        document.title = title;
        setMetaTag('name', 'description', description);
        setMetaTag('name', 'keywords', keywords.join(', '));

        // تحديث Open Graph tags
        setMetaTag('property', 'og:title', title);
        setMetaTag('property', 'og:description', description);
        setMetaTag('property', 'og:image', img);
        setMetaTag('property', 'og:url', url);

        // تحديث Twitter tags
        setMetaTag('name', 'twitter:title', title);
        setMetaTag('name', 'twitter:description', description);
        setMetaTag('name', 'twitter:image', img);

        if (canonical) {
            setCanonicalTag(canonical);
        }

        return () => {
            // يمكنك إضافة عمليات تنظيف هنا إذا لزم الأمر
        };
    }, [title, description, keywords, canonical, img, url]);

    const setMetaTag = (attr, key, content) => {
        if (content) {
            let element = document.querySelector(`meta[${attr}="${key}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        }
    };

    const setCanonicalTag = (href) => {
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', href);
    };
};

export default usePageSEO;




// import { useEffect } from "react";

// const usePageSEO = ({
//     title,
//     description,
//     keywords = [],
//     canonical 
// }) => {
//     useEffect(() => {
//         document.title = title;
//         setMetaTag('name', 'description', description);
//         setMetaTag('name', 'keywords', keywords.join(', '));
        

//         if (canonical) {
//             setCanonicalTag(canonical);
//         }

//         return () => {
//             // يمكنك إضافة عمليات تنظيف هنا إذا لزم الأمر
//         };
//     }, [title, description, keywords, canonical]);

//     const setMetaTag = (attr, key, content) => {
//         if (content) {
//             let element = document.querySelector(`meta[${attr}="${key}"]`);
//             if (!element) {
//                 element = document.createElement('meta');
//                 element.setAttribute(attr, key);
//                 document.head.appendChild(element);
//             }
//             element.setAttribute('content', content);
//         }
//     };

//     const setCanonicalTag = (href) => {
//         let link = document.querySelector('link[rel="canonical"]');
//         if (!link) {
//             link = document.createElement('link');
//             link.setAttribute('rel', 'canonical');
//             document.head.appendChild(link);
//         }
//         link.setAttribute('href', href);
//     };
// };

// export default usePageSEO;




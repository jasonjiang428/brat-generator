   import { notFound } from "next/navigation";

   const posts = {
     "meme-psychology": { title: "Meme Psychology", content: "..." },
     "perfect-brat-aesthetic": { title: "Perfect Brat Aesthetic", content: "..." },
     "the-rise-of-brat-culture": { title: "The Rise of Brat Culture", content: "..." },
   };

   export default function BlogPost({ params }: { params: { slug: string } }) {
     const post = posts[params.slug];
     if (!post) return notFound();

     return (
       <div>
         <h1>{post.title}</h1>
         <div>{post.content}</div>
       </div>
     );
   }
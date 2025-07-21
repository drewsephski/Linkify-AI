# Linkify AI

Linkify AI is a powerful tool that transforms your video or audio content into a blog post in seconds, powered by cutting-edge AI technology. Transform your content with AI-powered blog generation - it's designed to streamline your content creation process and generate high-quality blog posts effortlessly.

![thumbnails](https://github.com/user-attachments/assets/04dccf47-316b-46b7-b69b-e07482a683ba)

## Features

- 🚀 AI-Powered Conversion: Convert audio or video into a blog post within seconds using AI.
- 🔐 Authentication: Secure user authentication via Clerk
- 📝 Blog Post Generation: Automatically generate blog posts based on audio or video transcriptions.
- 💳 Payment Integration: Fully integrated with Stripe for handling payments, custom pricing, and subscription management.
- 💾 Database Management: Efficient data management with NeonDb.
- 📤 File Uploads: Seamless file uploads using UploadThing.
- 🎙️ Audio and video file processing (up to 25MB)
- 🖋️ Markdown Editor: Edit your blog posts with a built-in Markdown editor.
- 💅 TailwindCSS for styling
- 🔒 Secure file handling and processing
- 🪝 Webhook implementation for Stripe events
- 🔍 SEO-friendly blog post generation

## Built with

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Magic UI](https://magicui.design)
- [Clerk](https://clerk.com/)
- [Stripe](https://stripe.com/)
- [Neon](https://neon.tech/)
- [Upload things](https://uploadthing.com/)
- [Open AI](https://openai.com/)

### Tools

- [Biome](https://biomejs.dev/)
- [Husky](https://typicode.github.io/husky/)

## Feature Requests

To request a feature open a [GitHub issue](https://github.com/anayatkhan1/Linkify-AI/issues).

## Contribution Guidelines

Thank you for considering contributing to our AI-powered blog generator project! Please follow these guidelines to ensure smooth collaboration:

1. Fork the repository to your GitHub account.
2. Clone the forked repository to your local machine:
3. Create a new branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Make your changes and ensure they adhere to the project's coding style and guidelines.
5. Test your changes thoroughly to avoid introducing bugs.
6. Commit your changes with clear and descriptive commit messages:

   ```bash
   git commit -m 'feat: Add your descriptive commit message'
   ```

   `Note:` Before committing changes, ensure you include one of these tags in your commit message: `feat, fix, wip, patch, build`.

7. Push your changes to your forked repository:

   ```bash
   git push origin feature/your-feature-name
   ```

8. Open a pull request against the `main` branch of the original repository.
9. Provide a clear and concise description of your changes in the pull request, along with any relevant information.
10. Ensure your pull request passes all checks and tests before requesting a review.

### Setting Up Environment Variables

To run the project locally, you need to set up the following environment variables:

```python
# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard

# STRIPE
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_BASIC_PLAN=
STRIPE_PRICE_ID_PRO_PLAN=

# NEONDB
DATABASE_URL=

# UPLOADTHING
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

# OPENAI
OPENAI_API_KEY=

PRODUCTION_ORIGIN_URL=
NEXT_PUBLIC_APP_NAME=Linkify

```

You can set these environment variables by creating a `.env.local or .env` file in the root directory of the project and adding the variables with their respective values:

BRAND VOICE GUIDELINES:

Use a friendly, approachable tone that makes complex topics easy to understand.

Focus on practical value and actionable insights.

Include subtle mentions of Linkify AI's capabilities where relevant.

Use "we" and "our" to create connection with readers.

End with a compelling call-to-action for Linkify AI.
` : '';

const audienceContext = targetAudience ? TARGET AUDIENCE: ${targetAudience} Tailor the content complexity and examples to this specific audience. : '';

return `Generate a comprehensive, SEO-optimized blog post about "${topic}".

REQUIREMENTS:

Primary keywords: ${keywords.slice(0, 3).join(', ')}
Secondary keywords: ${keywords.slice(3).join(', ') || 'none'}
Target word count: ${wordCount} words
Tone: ${tone}
Include engaging introduction with hook.
Structure with clear H2 and H3 headings.
Add compelling conclusion with key takeaways.
Include 3-5 relevant internal linking suggestions.
Suggest 2-3 image generation prompts with alt text.
Generate SEO meta description (150-160 characters).
Create URL-friendly slug.
Estimate reading time.
Add relevant tags for categorization.

brandContext{audienceContext}

OUTPUT FORMAT:
Return a valid JSON object matching the EnhancedBlogPost schema. Ensure all content is original, engaging, and provides real value to readers.`;

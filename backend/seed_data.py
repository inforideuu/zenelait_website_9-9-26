import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import DemoRequest, JobApplication, PageSectionContent, Testimonial, OpenPosition

def seed():
    # 1. Page Sections
    sections = [
        {
            'section_key': 'home_intro',
            'title': 'Indian Product Engineering & Growth Team',
            'subtitle': 'Zenelait InfoTech builds business software and runs digital growth programmes for ambitious companies.',
            'body': 'We work across enterprise web applications, mobile platforms, lead engine workflows and custom operational tools. Our focus is shipping software that actually gets adopted and marketing campaigns that generate real commercial revenue.',
            'extra_json': {'badge': 'WHO WE ARE', 'tagline': 'Engineered in India • Built for Growth'}
        },
        {
            'section_key': 'home_stats',
            'title': 'Platform Growth Metrics',
            'subtitle': 'Measurable impact delivered across engineering & marketing engagements.',
            'body': 'Metrics tracked across live client systems.',
            'extra_json': [
                {'label': 'Active Enterprise Clients', 'value': '50+', 'sub': 'Across India & Overseas'},
                {'label': 'Custom Modules Deployed', 'value': '120+', 'sub': 'ERP, CRM, LMS & Mobile'},
                {'label': 'Qualified Business Leads', 'value': '1.2M+', 'sub': 'Generated via Digital Programs'},
                {'label': 'Client Support SLA', 'value': '99.9%', 'sub': 'Uptime & Technical Support'}
            ]
        },
        {
            'section_key': 'about_who_we_are',
            'title': 'Who We Are',
            'subtitle': 'Product engineers, designers and performance marketers working under one roof.',
            'body': 'Founded with a clear focus on practical business execution, Zenelait InfoTech bridges the gap between software development and market growth. We construct the software systems that power your daily operations, and run the targeted acquisition channels that bring you qualified customers.',
            'extra_json': {'established': '2020', 'headquarters': 'Chennai, Tamil Nadu'}
        },
        {
            'section_key': 'about_mission',
            'title': 'Our Mission',
            'subtitle': 'Build robust, scalable technology that simplifies daily business operations.',
            'body': 'To empower ambitious businesses with intuitive software tools and repeatable digital growth engines, removing technical friction and driving predictable revenue expansion.',
            'extra_json': {'icon': 'Target'}
        },
        {
            'section_key': 'about_vision',
            'title': 'Our Vision',
            'subtitle': 'Be the premier technology & digital growth partner for growth-stage enterprises.',
            'body': 'To be recognized globally for engineering elegance, high-converting digital strategy, and unwavering client commitment across every system we deploy.',
            'extra_json': {'icon': 'Eye'}
        },
        {
            'section_key': 'about_values',
            'title': 'Product & Service Values',
            'subtitle': 'Core principles guiding every line of code and marketing program.',
            'body': 'Our values define how we design solutions, protect data, and support client teams.',
            'extra_json': [
                {'title': 'Customer-first philosophy', 'copy': 'We win only when your team actually uses what we build. Adoption is our delivery metric.'},
                {'title': 'Privacy & security by default', 'copy': 'Role-based access, encrypted storage and clear data ownership on every deployment.'},
                {'title': 'Continuous R&D', 'copy': 'We invest continuously in AI, automation and platform work so our products stay sharp.'},
                {'title': 'Long-term commitment', 'copy': 'Implementation is the beginning. Training, support and iteration continue as you grow.'}
            ]
        }
    ]

    for item in sections:
        PageSectionContent.objects.update_or_create(
            section_key=item['section_key'],
            defaults=item
        )
    print("Page sections seeded.")

    # 2. Testimonials
    testimonials = [
        {
            'page': 'home',
            'author': 'Ramesh Kumar',
            'role': 'Director of Operations',
            'company': 'Apex Logistics India',
            'content': 'Zenelait InfoTech transformed our manual dispatch process into an automated cloud ERP. Order processing speed doubled within 30 days.',
            'rating': 5,
        },
        {
            'page': 'home',
            'author': 'Anita Sundaram',
            'role': 'Head of Marketing',
            'company': 'Vanguard Retail Systems',
            'content': 'Their targeted lead generation campaigns brought in qualified B2B inquiries consistently. Highest ROI we have seen from any agency partner.',
            'rating': 5,
        },
        {
            'page': 'it_products',
            'author': 'Karthik Raja',
            'role': 'Chief Technology Officer',
            'company': 'Metro Healthcare Solutions',
            'content': 'The custom billing and CRM module developed by Zenelait InfoTech integrates seamlessly with our existing database. Zero downtime since launch.',
            'rating': 5,
        },
        {
            'page': 'it_products',
            'author': 'Deepa Viswanathan',
            'role': 'Managing Director',
            'company': 'Horizon EduTech',
            'content': 'Their LMS platform scaled effortlessly during peak enrollment. Excellent UX and proactive engineering support from the Zenelait InfoTech team.',
            'rating': 5,
        }
    ]

    for item in testimonials:
        Testimonial.objects.get_or_create(
            author=item['author'],
            page=item['page'],
            defaults=item
        )
    print("Testimonials seeded.")

    # 3. Open Positions
    positions = [
        {
            'title': 'Senior Full Stack Developer (React / Django)',
            'department': 'Product Engineering',
            'location': 'Chennai, Tamil Nadu (Hybrid)',
            'type': 'Full-time',
            'experience': '3 - 5 Years',
            'description': 'We are looking for an experienced Full Stack Developer to build high-performance web applications, API integrations, and scalable database schemas.',
            'requirements': ['Strong proficiency in React / TypeScript & Python Django', 'REST API design & MySQL optimization', 'Experience with cloud infrastructure (AWS/GCP)']
        },
        {
            'title': 'Digital Marketing & Lead Gen Specialist',
            'department': 'Performance Growth',
            'location': 'Chennai, Tamil Nadu',
            'type': 'Full-time',
            'experience': '2 - 4 Years',
            'description': 'Drive performance marketing campaigns across Google Ads, Meta Ads, and LinkedIn for our B2B and B2C enterprise clients.',
            'requirements': ['Hands-on experience managing ad spends and funnel optimization', 'Strong analytical skills with GA4 and GTM', 'Proven track record in B2B lead generation']
        },
        {
            'title': 'UI/UX & Product Designer',
            'department': 'Design Studio',
            'location': 'Remote / Chennai',
            'type': 'Full-time',
            'experience': '2+ Years',
            'description': 'Craft stunning, responsive user interfaces, design systems, and visual brand identities for enterprise clients.',
            'requirements': ['Mastery of Figma, micro-animations, and design systems', 'Solid understanding of modern web responsive layouts', 'Strong portfolio showcasing Web/App projects']
        }
    ]

    for item in positions:
        OpenPosition.objects.get_or_create(
            title=item['title'],
            defaults=item
        )
    print("Open positions seeded.")

    # 4. Demo Requests - Dynamic submission only (no mock seed data)
    print("Demo requests ready for live user submissions.")

if __name__ == '__main__':
    seed()

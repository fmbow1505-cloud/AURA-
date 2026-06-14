'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Lang = 'fr' | 'en' | 'es' | 'ar' | 'pt';
type Currency = 'EUR' | 'USD' | 'FCFA';

const RATES: Record<Currency, number> = { EUR: 1, USD: 1.3, FCFA: 650 };
const SYMBOLS: Record<Currency, string> = { EUR: '€', USD: '$', FCFA: 'FCFA' };
const gold = '#D4AF37';

const LANG_LABELS: Record<Lang, string> = {
  fr: '🇫🇷 FR', en: '🇬🇧 EN', es: '🇪🇸 ES', ar: '🇸🇦 AR', pt: '🇵🇹 PT',
};

const T = {
  nav: {
    fr: { features: 'Fonctionnalités', pricing: 'Tarifs', network: 'Réseau mondial', contact: 'Contact', login: 'Connexion', getStarted: 'Commencer' },
    en: { features: 'Features', pricing: 'Pricing', network: 'Global Network', contact: 'Contact', login: 'Login', getStarted: 'Get Started' },
    es: { features: 'Funciones', pricing: 'Precios', network: 'Red Global', contact: 'Contacto', login: 'Iniciar sesión', getStarted: 'Empezar' },
    ar: { features: 'الميزات', pricing: 'الأسعار', network: 'الشبكة العالمية', contact: 'اتصل بنا', login: 'تسجيل الدخول', getStarted: 'ابدأ الآن' },
    pt: { features: 'Recursos', pricing: 'Preços', network: 'Rede Global', contact: 'Contato', login: 'Entrar', getStarted: 'Começar' },
  },
  hero: {
    fr: { badge: '✦ Expérience IA Premium', title: "L'avenir de l'IA", highlight: 'Est-ce ici ?', desc: "Découvrez GPT-4, Claude et Gemini au sein d'une interface élégante. AURA offre des capacités d'IA de pointe d'une sophistication inégalée.", trial: 'Essai gratuit →', explore: 'Explorer les fonctionnalités', sla: 'SLA de disponibilité', secure: 'Sécurisé', servers: 'Serveurs mondiaux' },
    en: { badge: '✦ Premium AI Experience', title: 'The Future of AI', highlight: 'Is Here', desc: 'Experience GPT-4, Claude, and Gemini in one elegant interface. AURA delivers premium AI capabilities with unparalleled sophistication.', trial: 'Start Free Trial →', explore: 'Explore Features', sla: 'Uptime SLA', secure: 'Secure', servers: 'Global Servers' },
    es: { badge: '✦ Experiencia IA Premium', title: 'El futuro de la IA', highlight: '¿Está aquí?', desc: 'Descubre GPT-4, Claude y Gemini en una interfaz elegante. AURA ofrece capacidades de IA de vanguardia con una sofisticación inigualable.', trial: 'Prueba gratis →', explore: 'Explorar funciones', sla: 'SLA de disponibilidad', secure: 'Seguro', servers: 'Servidores globales' },
    ar: { badge: '✦ تجربة ذكاء اصطناعي مميزة', title: 'مستقبل الذكاء الاصطناعي', highlight: 'هل هو هنا؟', desc: 'اكتشف GPT-4 و Claude و Gemini في واجهة واحدة أنيقة. تقدم AURA قدرات ذكاء اصطناعي متطورة بمستوى لا يضاهى من التطور.', trial: 'جرب مجانًا ←', explore: 'استكشف الميزات', sla: 'اتفاقية مستوى الخدمة', secure: 'آمن', servers: 'خوادم عالمية' },
    pt: { badge: '✦ Experiência de IA Premium', title: 'O futuro da IA', highlight: 'Chegou?', desc: 'Conheça o GPT-4, Claude e Gemini em uma interface elegante. AURA oferece capacidades de IA de ponta com sofisticação incomparável.', trial: 'Teste gratuito →', explore: 'Explorar recursos', sla: 'SLA de disponibilidade', secure: 'Seguro', servers: 'Servidores globais' },
  },
  featuresSection: {
    fr: { badge: 'FONCTIONNALITÉS', title: 'Capacités IA Premium', desc: "Tout ce dont vous avez besoin pour exploiter la puissance de l'intelligence artificielle, dans une expérience élégante." },
    en: { badge: 'FEATURES', title: 'Premium AI Capabilities', desc: 'Everything you need to harness the power of artificial intelligence, wrapped in an elegant experience.' },
    es: { badge: 'FUNCIONES', title: 'Capacidades de IA Premium', desc: 'Todo lo que necesitas para aprovechar el poder de la inteligencia artificial, en una experiencia elegante.' },
    ar: { badge: 'الميزات', title: 'قدرات الذكاء الاصطناعي المميزة', desc: 'كل ما تحتاجه لتسخير قوة الذكاء الاصطناعي، في تجربة أنيقة.' },
    pt: { badge: 'RECURSOS', title: 'Capacidades de IA Premium', desc: 'Tudo o que você precisa para aproveitar o poder da inteligência artificial, em uma experiência elegante.' },
  },
  pricingSection: {
    fr: { badge: 'TARIFS EMPIRE', title: 'Choisissez votre empire', desc: "Investissez dans l'excellence. Tous les plans incluent nos modèles IA premium et un support de classe mondiale.", month: '/mois' },
    en: { badge: 'EMPIRE PRICING', title: 'Choose Your Empire', desc: 'Invest in excellence. All plans include our premium AI models and world-class support.', month: '/month' },
    es: { badge: 'PRECIOS IMPERIO', title: 'Elige tu imperio', desc: 'Invierte en excelencia. Todos los planes incluyen nuestros modelos de IA premium y soporte de clase mundial.', month: '/mes' },
    ar: { badge: 'أسعار الإمبراطورية', title: 'اختر إمبراطوريتك', desc: 'استثمر في التميز. تشمل جميع الخطط نماذج الذكاء الاصطناعي المميزة ودعمًا عالمي المستوى.', month: '/شهر' },
    pt: { badge: 'PREÇOS IMPÉRIO', title: 'Escolha seu império', desc: 'Invista em excelência. Todos os planos incluem nossos modelos de IA premium e suporte de classe mundial.', month: '/mês' },
  },
  networkSection: {
    fr: { badge: 'INFRASTRUCTURE', title: 'Réseau de serveurs mondial', desc: "Des serveurs stratégiquement placés garantissent des réponses ultra-rapides où que vous soyez." },
    en: { badge: 'INFRASTRUCTURE', title: 'Global Server Network', desc: 'Strategically positioned servers ensure lightning-fast responses wherever you are in the world.' },
    es: { badge: 'INFRAESTRUCTURA', title: 'Red de servidores global', desc: 'Servidores ubicados estratégicamente garantizan respuestas ultrarrápidas donde sea que estés.' },
    ar: { badge: 'البنية التحتية', title: 'شبكة الخوادم العالمية', desc: 'تضمن الخوادم الموضوعة بشكل استراتيجي استجابات فائقة السرعة في أي مكان حول العالم.' },
    pt: { badge: 'INFRAESTRUTURA', title: 'Rede global de servidores', desc: 'Servidores posicionados estrategicamente garantem respostas ultrarrápidas em qualquer lugar do mundo.' },
  },
  contactSection: {
    fr: { badge: 'CONTACT', title: 'Contactez-nous', desc: "Des questions ? Nous serions ravis de vous entendre. Envoyez-nous un message et nous répondrons dans les 24h.", name: 'Nom', email: 'Email', subject: 'Sujet', message: 'Message', namePh: 'Votre nom', emailPh: 'vous@email.com', subjectPh: 'Comment pouvons-nous vous aider ?', messagePh: 'Parlez-nous de votre besoin...', send: 'Envoyer le message', info: 'Informations de contact', infoDesc: "Contactez-nous à tout moment. Notre équipe est là pour vous aider à tirer le meilleur parti d'AURA.", locations: 'Emplacements' },
    en: { badge: 'CONTACT', title: 'Get in Touch', desc: "Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.", name: 'Name', email: 'Email', subject: 'Subject', message: 'Message', namePh: 'Your name', emailPh: 'you@email.com', subjectPh: 'How can we help?', messagePh: 'Tell us more about your needs...', send: 'Send Message', info: 'Contact Information', infoDesc: 'Reach out to us anytime. Our team is here to help you get the most out of AURA.', locations: 'Locations' },
    es: { badge: 'CONTACTO', title: 'Ponte en contacto', desc: '¿Tienes preguntas? Nos encantaría saber de ti. Envíanos un mensaje y responderemos en 24 horas.', name: 'Nombre', email: 'Correo', subject: 'Asunto', message: 'Mensaje', namePh: 'Tu nombre', emailPh: 'tu@email.com', subjectPh: '¿Cómo podemos ayudarte?', messagePh: 'Cuéntanos más sobre tu necesidad...', send: 'Enviar mensaje', info: 'Información de contacto', infoDesc: 'Contáctanos en cualquier momento. Nuestro equipo está aquí para ayudarte a sacar el máximo provecho de AURA.', locations: 'Ubicaciones' },
    ar: { badge: 'اتصل بنا', title: 'تواصل معنا', desc: 'هل لديك أسئلة؟ نود أن نسمع منك. أرسل لنا رسالة وسنرد في غضون 24 ساعة.', name: 'الاسم', email: 'البريد الإلكتروني', subject: 'الموضوع', message: 'الرسالة', namePh: 'اسمك', emailPh: 'you@email.com', subjectPh: 'كيف يمكننا مساعدتك؟', messagePh: 'أخبرنا المزيد عن حاجتك...', send: 'إرسال الرسالة', info: 'معلومات الاتصال', infoDesc: 'تواصل معنا في أي وقت. فريقنا هنا لمساعدتك على الاستفادة القصوى من AURA.', locations: 'المواقع' },
    pt: { badge: 'CONTATO', title: 'Fale conosco', desc: 'Tem perguntas? Adoraríamos ouvir você. Envie-nos uma mensagem e responderemos em 24 horas.', name: 'Nome', email: 'Email', subject: 'Assunto', message: 'Mensagem', namePh: 'Seu nome', emailPh: 'voce@email.com', subjectPh: 'Como podemos ajudar?', messagePh: 'Conte-nos mais sobre sua necessidade...', send: 'Enviar mensagem', info: 'Informações de contato', infoDesc: 'Contate-nos a qualquer momento. Nossa equipe está aqui para ajudar você a aproveitar o máximo da AURA.', locations: 'Localizações' },
  },
  footer: {
    fr: { tagline: 'Plateforme IA premium offrant GPT-4, Claude et Gemini dans une expérience élégante.', product: 'Produit', company: 'Entreprise', support: 'Support', privacy: 'Politique de confidentialité', terms: "Conditions d'utilisation", rights: 'Tous droits réservés.', made: 'Conçu avec excellence à Dakar, Paris et New York' },
    en: { tagline: 'Premium AI platform delivering GPT-4, Claude, and Gemini in one elegant experience.', product: 'Product', company: 'Company', support: 'Support', privacy: 'Privacy Policy', terms: 'Terms of Service', rights: 'All rights reserved.', made: 'Made with excellence in Dakar, Paris and New York' },
    es: { tagline: 'Plataforma de IA premium que ofrece GPT-4, Claude y Gemini en una experiencia elegante.', product: 'Producto', company: 'Empresa', support: 'Soporte', privacy: 'Política de privacidad', terms: 'Términos de servicio', rights: 'Todos los derechos reservados.', made: 'Hecho con excelencia en Dakar, París y Nueva York' },
    ar: { tagline: 'منصة ذكاء اصطناعي مميزة تقدم GPT-4 و Claude و Gemini في تجربة أنيقة واحدة.', product: 'المنتج', company: 'الشركة', support: 'الدعم', privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة', rights: 'جميع الحقوق محفوظة.', made: 'صُنع بامتياز في داكار وباريس ونيويورك' },
    pt: { tagline: 'Plataforma de IA premium que oferece GPT-4, Claude e Gemini em uma experiência elegante.', product: 'Produto', company: 'Empresa', support: 'Suporte', privacy: 'Política de privacidade', terms: 'Termos de serviço', rights: 'Todos os direitos reservados.', made: 'Feito com excelência em Dakar, Paris e Nova York' },
  },
};

const FEATURES = [
  { icon: '◈', key: 'multiModel' },
  { icon: '⚡', key: 'lightning' },
  { icon: '🛡', key: 'security' },
  { icon: '🌐', key: 'network' },
  { icon: '💬', key: 'conversations' },
  { icon: '</>', key: 'devApi' },
  { icon: '📊', key: 'analytics' },
  { icon: '✦', key: 'agents' },
];

const FEATURES_TEXT: Record<string, Record<Lang, { title: string; desc: string }>> = {
  multiModel: {
    fr: { title: 'IA Multi-modèles', desc: 'Accédez à GPT-4, Claude et Gemini sur une seule plateforme. Changez de modèle en toute fluidité.' },
    en: { title: 'Multi-Model AI', desc: 'Access GPT-4, Claude, and Gemini in one platform. Switch between models seamlessly.' },
    es: { title: 'IA multimodelo', desc: 'Accede a GPT-4, Claude y Gemini en una sola plataforma. Cambia de modelo sin esfuerzo.' },
    ar: { title: 'ذكاء اصطناعي متعدد النماذج', desc: 'الوصول إلى GPT-4 و Claude و Gemini في منصة واحدة. التبديل بين النماذج بسلاسة.' },
    pt: { title: 'IA multimodelo', desc: 'Acesse GPT-4, Claude e Gemini em uma única plataforma. Alterne entre modelos sem esforço.' },
  },
  lightning: {
    fr: { title: 'Ultra rapide', desc: 'Réponses en streaming en temps réel avec un traitement optimisé pour des résultats instantanés.' },
    en: { title: 'Lightning Fast', desc: 'Real-time streaming responses with optimized processing for instant results.' },
    es: { title: 'Ultrarrápido', desc: 'Respuestas en streaming en tiempo real con procesamiento optimizado para resultados instantáneos.' },
    ar: { title: 'سريع كالبرق', desc: 'استجابات بث في الوقت الفعلي مع معالجة محسّنة للحصول على نتائج فورية.' },
    pt: { title: 'Ultra rápido', desc: 'Respostas em streaming em tempo real com processamento otimizado para resultados instantâneos.' },
  },
  security: {
    fr: { title: 'Sécurité entreprise', desc: 'Chiffrement de niveau bancaire et conformité SOC 2. Vos données sont toujours protégées.' },
    en: { title: 'Enterprise Security', desc: 'Bank-grade encryption and SOC 2 compliance. Your data is always protected.' },
    es: { title: 'Seguridad empresarial', desc: 'Cifrado de nivel bancario y cumplimiento SOC 2. Tus datos siempre están protegidos.' },
    ar: { title: 'أمان على مستوى المؤسسات', desc: 'تشفير بمستوى البنوك والتوافق مع SOC 2. بياناتك محمية دائمًا.' },
    pt: { title: 'Segurança empresarial', desc: 'Criptografia de nível bancário e conformidade com SOC 2. Seus dados estão sempre protegidos.' },
  },
  network: {
    fr: { title: 'Réseau mondial', desc: 'Serveurs à Dakar, Paris et New York pour une latence minimale partout dans le monde.' },
    en: { title: 'Global Network', desc: 'Servers in Dakar, Paris, and New York for minimal latency worldwide.' },
    es: { title: 'Red global', desc: 'Servidores en Dakar, París y Nueva York para una latencia mínima en todo el mundo.' },
    ar: { title: 'شبكة عالمية', desc: 'خوادم في داكار وباريس ونيويورك لتقليل التأخير في جميع أنحاء العالم.' },
    pt: { title: 'Rede global', desc: 'Servidores em Dakar, Paris e Nova York para latência mínima em todo o mundo.' },
  },
  conversations: {
    fr: { title: 'Conversations naturelles', desc: "Mémoire contextuelle et dialogue naturel pour des interactions semblables à celles d'un humain." },
    en: { title: 'Natural Conversations', desc: 'Contextual memory and natural dialogue for human-like interactions.' },
    es: { title: 'Conversaciones naturales', desc: 'Memoria contextual y diálogo natural para interacciones similares a las humanas.' },
    ar: { title: 'محادثات طبيعية', desc: 'ذاكرة سياقية وحوار طبيعي لتفاعلات شبيهة بالبشر.' },
    pt: { title: 'Conversas naturais', desc: 'Memória contextual e diálogo natural para interações semelhantes às humanas.' },
  },
  devApi: {
    fr: { title: 'API développeur', desc: 'Accès API REST complet avec documentation détaillée et SDKs.' },
    en: { title: 'Developer API', desc: 'Full REST API access with comprehensive documentation and SDKs.' },
    es: { title: 'API para desarrolladores', desc: 'Acceso completo a la API REST con documentación detallada y SDKs.' },
    ar: { title: 'واجهة برمجة للمطورين', desc: 'وصول كامل إلى REST API مع وثائق شاملة وحزم SDK.' },
    pt: { title: 'API para desenvolvedores', desc: 'Acesso completo à API REST com documentação abrangente e SDKs.' },
  },
  analytics: {
    fr: { title: 'Tableau de bord analytique', desc: "Suivez l'usage, surveillez les performances et optimisez vos workflows IA." },
    en: { title: 'Analytics Dashboard', desc: 'Track usage, monitor performance, and optimize your AI workflows.' },
    es: { title: 'Panel de análisis', desc: 'Supervisa el uso, monitorea el rendimiento y optimiza tus flujos de trabajo de IA.' },
    ar: { title: 'لوحة التحليلات', desc: 'تتبع الاستخدام، ومراقبة الأداء، وتحسين سير عمل الذكاء الاصطناعي الخاص بك.' },
    pt: { title: 'Painel de análise', desc: 'Acompanhe o uso, monitore o desempenho e otimize seus fluxos de trabalho de IA.' },
  },
  agents: {
    fr: { title: 'Agents personnalisés', desc: "Créez des agents IA spécialisés adaptés à vos besoins spécifiques." },
    en: { title: 'Custom Agents', desc: 'Create specialized AI agents tailored to your specific needs.' },
    es: { title: 'Agentes personalizados', desc: 'Crea agentes de IA especializados adaptados a tus necesidades específicas.' },
    ar: { title: 'وكلاء مخصصون', desc: 'إنشاء وكلاء ذكاء اصطناعي متخصصين مصممين خصيصًا لتلبية احتياجاتك.' },
    pt: { title: 'Agentes personalizados', desc: 'Crie agentes de IA especializados adaptados às suas necessidades específicas.' },
  },
};

const PLANS = [
  {
    id: 'free', name: 'Free', priceEUR: 0, icon: '✦', accent: '#666',
    desc: { fr: 'Pour découvrir AURA gratuitement', en: 'Try AURA for free', es: 'Prueba AURA gratis', ar: 'جرب AURA مجانًا', pt: 'Experimente o AURA gratuitamente' },
    features: {
      fr: ['3 essais gratuits', 'Accès au modèle GPT-4 de base', 'Interface de chat standard', 'Support communautaire'],
      en: ['3 free trials', 'Basic GPT-4 model access', 'Standard chat interface', 'Community support'],
      es: ['3 pruebas gratuitas', 'Acceso al modelo GPT-4 básico', 'Interfaz de chat estándar', 'Soporte comunitario'],
      ar: ['3 محاولات مجانية', 'الوصول إلى نموذج GPT-4 الأساسي', 'واجهة محادثة قياسية', 'دعم المجتمع'],
      pt: ['3 testes gratuitos', 'Acesso ao modelo GPT-4 básico', 'Interface de chat padrão', 'Suporte da comunidade'],
    },
  },
  {
    id: 'starter', name: 'Starter', priceEUR: 50, icon: '◇', accent: '#888',
    desc: { fr: 'Idéal pour découvrir les capacités IA', en: 'Perfect for individuals exploring AI capabilities', es: 'Perfecto para explorar las capacidades de la IA', ar: 'مثالي للأفراد الذين يستكشفون قدرات الذكاء الاصطناعي', pt: 'Perfeito para explorar as capacidades de IA' },
    features: {
      fr: ['25 000 jetons IA / mois', 'Accès GPT-4 et Claude', 'Interface de chat premium', 'Support par email', '10 conversations historiques', 'Analytique de base'],
      en: ['25,000 AI tokens/month', 'GPT-4 & Claude access', 'Premium chat interface', 'Email support', '10 conversation history', 'Basic analytics'],
      es: ['25,000 tokens IA/mes', 'Acceso a GPT-4 y Claude', 'Interfaz de chat premium', 'Soporte por correo', '10 conversaciones de historial', 'Análisis básico'],
      ar: ['25,000 رمز ذكاء اصطناعي/شهر', 'الوصول إلى GPT-4 و Claude', 'واجهة محادثة مميزة', 'دعم عبر البريد الإلكتروني', '10 محادثات سابقة', 'تحليلات أساسية'],
      pt: ['25.000 tokens de IA/mês', 'Acesso a GPT-4 e Claude', 'Interface de chat premium', 'Suporte por email', '10 históricos de conversas', 'Análises básicas'],
    },
  },
  {
    id: 'pro', name: 'Pro', priceEUR: 150, icon: '⬢', accent: gold, highlight: true,
    desc: { fr: "Pour les pros qui exigent l'excellence", en: 'For professionals who demand excellence', es: 'Para profesionales que exigen excelencia', ar: 'للمحترفين الذين يطلبون التميز', pt: 'Para profissionais que exigem excelência' },
    features: {
      fr: ['150 000 jetons IA / mois', 'Accès GPT-4, Claude et Gemini', 'Traitement prioritaire', 'Historique illimité', 'Accès complet API', 'Support 24/7', 'Agents ×3', 'Analytique avancée'],
      en: ['150,000 AI tokens/month', 'GPT-4, Claude & Gemini', 'Priority processing', 'Unlimited history', 'Full API access', 'Support 24/7', 'Custom agents ×3', 'Advanced analytics'],
      es: ['150,000 tokens/mes', 'GPT-4, Claude y Gemini', 'Procesamiento prioritario', 'Historial ilimitado', 'API completa', 'Soporte 24/7', 'Agentes ×3', 'Análisis avanzado'],
      ar: ['150,000 رمز/شهر', 'GPT-4 و Claude و Gemini', 'معالجة ذات أولوية', 'سجل غير محدود', 'وصول كامل API', 'دعم 24/7', 'وكلاء ×3', 'تحليلات متقدمة'],
      pt: ['150.000 tokens/mês', 'GPT-4, Claude e Gemini', 'Processamento prioritário', 'Histórico ilimitado', 'API completa', 'Suporte 24/7', 'Agentes ×3', 'Análises avançadas'],
    },
  },
  {
    id: 'business', name: 'Business', priceEUR: 250, icon: '⬡', accent: '#3a8ee0',
    desc: { fr: "Pour les équipes qui construisent l'avenir", en: 'For teams building the future', es: 'Para equipos que construyen el futuro', ar: 'للفرق التي تبني المستقبل', pt: 'Para equipes que constroem o futuro' },
    features: {
      fr: ['500 000 jetons IA / mois', 'Tous les modèles IA', 'Équipe ×5', 'Modèles personnalisés', 'Webhooks', 'Support dédié', 'Agents ×10', 'Analytics temps réel', 'SLA 99,5%'],
      en: ['500,000 AI tokens/month', 'All AI models', 'Team ×5', 'Custom models', 'Webhooks', 'Dedicated support', 'Agents ×10', 'Real-time analytics', 'SLA 99.5%'],
      es: ['500,000 tokens/mes', 'Todos los modelos', 'Equipo ×5', 'Modelos personalizados', 'Webhooks', 'Soporte dedicado', 'Agentes ×10', 'Analytics en tiempo real', 'SLA 99.5%'],
      ar: ['500,000 رمز/شهر', 'جميع النماذج', 'فريق ×5', 'نماذج مخصصة', 'ويب هوك', 'دعم مخصص', 'وكلاء ×10', 'تحليلات فورية', 'SLA 99.5%'],
      pt: ['500.000 tokens/mês', 'Todos os modelos', 'Equipe ×5', 'Modelos personalizados', 'Webhooks', 'Suporte dedicado', 'Agentes ×10', 'Analytics em tempo real', 'SLA 99.5%'],
    },
  },
  {
    id: 'empire', name: 'Empire', priceEUR: 300, icon: '♛', accent: gold,
    desc: { fr: 'Puissance illimitée pour les visionnaires', en: 'Unlimited power for visionaries', es: 'Poder ilimitado para visionarios', ar: 'قوة غير محدودة للرؤيويين', pt: 'Poder ilimitado para visionários' },
    features: {
      fr: ['Jetons illimités', 'Tous modèles + accès anticipé', 'Équipe illimitée', 'Marque blanche', 'Entraînement IA', 'Déploiement sur site', 'Agents illimités', 'Suite entreprise', 'SLA 99,9%'],
      en: ['Unlimited tokens', 'All models + early access', 'Unlimited team', 'White-label', 'AI training', 'On-premise option', 'Unlimited agents', 'Enterprise suite', 'SLA 99.9%'],
      es: ['Tokens ilimitados', 'Todos + acceso anticipado', 'Equipo ilimitado', 'Marca blanca', 'Entrenamiento IA', 'On-premise', 'Agentes ilimitados', 'Suite empresarial', 'SLA 99.9%'],
      ar: ['رموز غير محدودة', 'الكل + وصول مبكر', 'فريق غير محدود', 'علامة بيضاء', 'تدريب ذكاء اصطناعي', 'نشر محلي', 'وكلاء غير محدودين', 'مجموعة مؤسسية', 'SLA 99.9%'],
      pt: ['Tokens ilimitados', 'Todos + acesso antecipado', 'Equipe ilimitada', 'White-label', 'Treinamento IA', 'On-premise', 'Agentes ilimitados', 'Suite empresarial', 'SLA 99.9%'],
    },
  },
];

const PRICE_LABELS: Record<string, Record<Lang, string>> = {
  free:     { fr: 'Commencer gratuitement', en: 'Start for Free',     es: 'Empezar gratis',      ar: 'ابدأ مجانًا',         pt: 'Começar gratuitamente' },
  starter:  { fr: 'Choisir Starter',        en: 'Choose Starter',     es: 'Elegir Starter',      ar: 'اختر Starter',        pt: 'Escolher Starter' },
  pro:      { fr: 'Choisir Pro',            en: 'Choose Pro',         es: 'Elegir Pro',          ar: 'اختر Pro',            pt: 'Escolher Pro' },
  business: { fr: 'Choisir Business',       en: 'Choose Business',    es: 'Elegir Business',     ar: 'اختر Business',       pt: 'Escolher Business' },
  empire:   { fr: 'Réclamer Empire',        en: 'Claim Your Empire',  es: 'Reclamar tu Empire',  ar: 'احصل على Empire',     pt: 'Reivindicar Empire' },
};

const SERVERS = [
  { city: 'Dakar',    latency: '12ms', users: '1,250' },
  { city: 'Paris',    latency: '8ms',  users: '4,820' },
  { city: 'New York', latency: '15ms', users: '7,340' },
];

export default function LandingPage() {
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [lang, setLang] = useState<Lang>('fr');
  const router = useRouter();
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const formatPrice = (eur: number) => `${Math.round(eur * RATES[currency])} ${SYMBOLS[currency]}`;

  const nav     = T.nav[lang];
  const hero    = T.hero[lang];
  const feat    = T.featuresSection[lang];
  const pricing = T.pricingSection[lang];
  const network = T.networkSection[lang];
  const contact = T.contactSection[lang];
  const foot    = T.footer[lang];

  return (
    <div dir={dir} style={{ background: '#0B0F19', minHeight: '100vh', color: '#fff', fontFamily: 'Georgia, serif' }}>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 60, flexWrap: 'wrap', gap: 8, background: 'rgba(11,15,25,0.95)', borderBottom: '1px solid #1a1a2e', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22, color: gold }}>✦</span>
          <span style={{ fontWeight: 700, fontSize: 20, color: gold, letterSpacing: 3 }}>AURA</span>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#888', flexWrap: 'wrap' }}>
          <a href="#features" style={{ color: '#888', textDecoration: 'none' }}>{nav.features}</a>
          <a href="#pricing"  style={{ color: '#888', textDecoration: 'none' }}>{nav.pricing}</a>
          <a href="#network"  style={{ color: '#888', textDecoration: 'none' }}>{nav.network}</a>
          <a href="#contact"  style={{ color: '#888', textDecoration: 'none' }}>{nav.contact}</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <select value={lang} onChange={e => setLang(e.target.value as Lang)} style={{ background: '#111', color: '#fff', border: '1px solid #333', borderRadius: 6, padding: '4px 6px', fontSize: 12, cursor: 'pointer' }}>
            {(Object.keys(LANG_LABELS) as Lang[]).map(l => <option key={l} value={l}>{LANG_LABELS[l]}</option>)}
          </select>
          <select value={currency} onChange={e => setCurrency(e.target.value as Currency)} style={{ background: '#111', color: gold, border: `1px solid ${gold}`, borderRadius: 6, padding: '4px 8px', fontSize: 12, cursor: 'pointer' }}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="FCFA">FCFA</option>
          </select>
          <button onClick={() => router.push('/login')} style={{ padding: '6px 14px', borderRadius: 8, background: 'transparent', border: '1px solid #333', color: '#fff', fontSize: 13, cursor: 'pointer' }}>{nav.login}</button>
          <button onClick={() => router.push('/login')} style={{ padding: '6px 14px', borderRadius: 8, background: gold, color: '#000', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{nav.getStarted}</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 20, border: `1px solid ${gold}`, background: 'rgba(212,175,55,0.08)', fontSize: 12, color: gold, marginBottom: 40 }}>{hero.badge}</div>
        <h1 style={{ fontSize: 52, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.1 }}>{hero.title}</h1>
        <div style={{ background: gold, padding: '10px 40px', borderRadius: 4, marginBottom: 32 }}>
          <span style={{ fontSize: 42, fontWeight: 700, color: '#7a5c00', fontStyle: 'italic' }}>{hero.highlight}</span>
        </div>
        <p style={{ fontSize: 16, color: '#888', maxWidth: 520, lineHeight: 1.8, margin: '0 0 40px' }}>{hero.desc}</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 80, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => router.push('/payment?plan=free')} style={{ padding: '12px 28px', borderRadius: 8, background: gold, color: '#000', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{hero.trial}</button>
          <a href="#features" style={{ padding: '12px 28px', borderRadius: 8, border: '1px solid #333', color: '#fff', fontSize: 14, textDecoration: 'none' }}>{hero.explore}</a>
        </div>
        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[{ icon: '⚡', value: '99.9%', label: hero.sla }, { icon: '🛡️', value: '100%', label: hero.secure }, { icon: '🌐', value: '3', label: hero.servers }].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 6, color: gold }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: gold }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 11, color: gold, border: `1px solid ${gold}55`, borderRadius: 20, padding: '4px 14px', marginBottom: 16, letterSpacing: 1 }}>{feat.badge}</div>
        <h2 style={{ fontSize: 32, color: '#fff', margin: '0 0 8px' }}>{feat.title}</h2>
        <p style={{ color: '#666', maxWidth: 560, margin: '0 auto 48px', fontSize: 14, lineHeight: 1.7 }}>{feat.desc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {FEATURES.map(f => {
            const t = FEATURES_TEXT[f.key][lang];
            return (
              <div key={f.key} style={{ background: '#0f1420', border: '1px solid #1a1a2e', borderRadius: 12, padding: '24px 20px', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${gold}1a`, color: gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{t.title}</h3>
                <p style={{ fontSize: 12, color: '#666', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 24px', maxWidth: 1300, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 11, color: gold, border: `1px solid ${gold}55`, borderRadius: 20, padding: '4px 14px', marginBottom: 16, letterSpacing: 1 }}>{pricing.badge}</div>
        <h2 style={{ fontSize: 32, color: '#fff', margin: '0 0 8px' }}>{pricing.title}</h2>
        <p style={{ color: '#666', maxWidth: 560, margin: '0 auto 48px', fontSize: 14, lineHeight: 1.7 }}>{pricing.desc}</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PLANS.map(plan => (
            <div key={plan.id} style={{ flex: '1 1 190px', maxWidth: 220, background: '#0f1420', border: `1px solid ${plan.highlight ? gold : '#1a1a2e'}`, borderTop: `3px solid ${plan.accent}`, borderRadius: 16, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 14, textAlign: lang === 'ar' ? 'right' : 'left', boxShadow: plan.highlight ? `0 0 24px ${gold}22` : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${plan.accent}22`, color: plan.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{plan.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{plan.name}</div>
              <div style={{ fontSize: 11, color: '#666', minHeight: 32 }}>{plan.desc[lang]}</div>
              <div>
                <span style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{formatPrice(plan.priceEUR)}</span>
                <span style={{ fontSize: 11, color: '#666' }}>{pricing.month}</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {plan.features[lang].map(f => (
                  <li key={f} style={{ fontSize: 11, color: '#999', display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                    <span style={{ color: plan.accent }}>●</span> {f}
                  </li>
                ))}
              </ul>
              {/* ✅ ICI : redirection vers /payment?plan=... */}
              <button
                onClick={() => router.push(`/payment?plan=${plan.id}`)}
                style={{ marginTop: 'auto', padding: '10px', borderRadius: 8, border: 'none', background: plan.highlight || plan.id === 'empire' ? gold : '#1a1a2e', color: plan.highlight || plan.id === 'empire' ? '#000' : '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
              >
                {PRICE_LABELS[plan.id][lang]}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* NETWORK */}
      <section id="network" style={{ padding: '80px 24px', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 11, color: gold, border: `1px solid ${gold}55`, borderRadius: 20, padding: '4px 14px', marginBottom: 16, letterSpacing: 1 }}>{network.badge}</div>
        <h2 style={{ fontSize: 32, color: '#fff', margin: '0 0 8px' }}>{network.title}</h2>
        <p style={{ color: '#666', maxWidth: 560, margin: '0 auto 32px', fontSize: 14, lineHeight: 1.7 }}>{network.desc}</p>
        <div style={{ background: '#0f1420', border: '1px solid #1a1a2e', borderRadius: 12, padding: '40px 20px', marginBottom: 16, color: '#333', fontSize: 13 }}>🌍 World map</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {SERVERS.map(s => (
            <div key={s.city} style={{ background: '#0f1420', border: '1px solid #1a1a2e', borderRadius: 10, padding: '12px 24px', textAlign: 'left', minWidth: 140 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3ddc84', display: 'inline-block' }} /> {s.city}
              </div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 6 }}>Latency: <span style={{ color: gold }}>{s.latency}</span></div>
              <div style={{ fontSize: 11, color: '#666' }}>Users: {s.users}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '80px 24px', maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 11, color: gold, border: `1px solid ${gold}55`, borderRadius: 20, padding: '4px 14px', marginBottom: 16, letterSpacing: 1 }}>{contact.badge}</div>
        <h2 style={{ fontSize: 32, color: '#fff', margin: '0 0 8px' }}>{contact.title}</h2>
        <p style={{ color: '#666', maxWidth: 560, margin: '0 auto 40px', fontSize: 14, lineHeight: 1.7 }}>{contact.desc}</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', textAlign: lang === 'ar' ? 'right' : 'left' }}>
          <form style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 12, background: '#0f1420', border: '1px solid #1a1a2e', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 120px' }}>
                <label style={{ fontSize: 12, color: '#888' }}>{contact.name}</label>
                <input placeholder={contact.namePh} style={{ width: '100%', marginTop: 6, padding: '10px', borderRadius: 8, border: '1px solid #333', background: '#0B0F19', color: '#fff', fontSize: 13, boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: '1 1 120px' }}>
                <label style={{ fontSize: 12, color: '#888' }}>{contact.email}</label>
                <input placeholder={contact.emailPh} style={{ width: '100%', marginTop: 6, padding: '10px', borderRadius: 8, border: '1px solid #333', background: '#0B0F19', color: '#fff', fontSize: 13, boxSizing: 'border-box' }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888' }}>{contact.subject}</label>
              <input placeholder={contact.subjectPh} style={{ width: '100%', marginTop: 6, padding: '10px', borderRadius: 8, border: '1px solid #333', background: '#0B0F19', color: '#fff', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#888' }}>{contact.message}</label>
              <textarea placeholder={contact.messagePh} rows={4} style={{ width: '100%', marginTop: 6, padding: '10px', borderRadius: 8, border: '1px solid #333', background: '#0B0F19', color: '#fff', fontSize: 13, boxSizing: 'border-box', resize: 'vertical' }} />
            </div>
            <button type="button" style={{ padding: '12px', borderRadius: 8, background: gold, color: '#000', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{contact.send}</button>
          </form>
          <div style={{ flex: '1 1 240px', background: '#0f1420', border: '1px solid #1a1a2e', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 16, color: '#fff', margin: '0 0 12px' }}>{contact.info}</h3>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, marginBottom: 20 }}>{contact.infoDesc}</p>
            <div style={{ fontSize: 13, color: '#999', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>✉️ fmbow1505@gmail.com</div>
              <div>📞 +221 78 192 57 37</div>
              <div>
                <div style={{ color: '#fff', marginBottom: 4 }}>{contact.locations}</div>
                Dakar, Senegal<br />Paris, France<br />New York, USA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1a1a2e', padding: '48px 24px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', textAlign: lang === 'ar' ? 'right' : 'left' }}>
          <div style={{ flex: '1 1 220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ color: gold, fontSize: 18 }}>✦</span>
              <span style={{ color: gold, fontWeight: 700, letterSpacing: 2 }}>AURA</span>
            </div>
            <p style={{ fontSize: 12, color: '#555', lineHeight: 1.7 }}>{foot.tagline}</p>
          </div>
          <div style={{ flex: '1 1 140px' }}>
            <h4 style={{ fontSize: 13, color: '#fff', marginBottom: 12 }}>{foot.product}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: '#666' }}>
              <a href="#features" style={{ color: '#666', textDecoration: 'none' }}>{nav.features}</a>
              <a href="#pricing"  style={{ color: '#666', textDecoration: 'none' }}>{nav.pricing}</a>
              <a href="#network"  style={{ color: '#666', textDecoration: 'none' }}>{nav.network}</a>
            </div>
          </div>
          <div style={{ flex: '1 1 140px' }}>
            <h4 style={{ fontSize: 13, color: '#fff', marginBottom: 12 }}>{foot.company}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: '#666' }}>
              <a href="#contact" style={{ color: '#666', textDecoration: 'none' }}>{nav.contact}</a>
              <span>{foot.privacy}</span>
              <span>{foot.terms}</span>
            </div>
          </div>
          <div style={{ flex: '1 1 140px' }}>
            <h4 style={{ fontSize: 13, color: '#fff', marginBottom: 12 }}>{foot.support}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: '#666' }}>
              <span>fmbow1505@gmail.com</span>
              <span>+221 78 192 57 37</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '32px auto 0', borderTop: '1px solid #1a1a2e', paddingTop: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 11, color: '#444' }}>
          <span>© 2026 AURA. {foot.rights}</span>
          <span>{foot.made}</span>
        </div>
      </footer>

    </div>
  );
         }

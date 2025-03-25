"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle, Star } from 'lucide-react';
import { colors } from '@/components/style/theme';



const faqData = [
  {
    category: "For Problem Posters",
    icon: <HelpCircle />,
    questions: [
      {
        question: "How do I effectively describe my problem?",
        answer: "Be specific about your problem, provide context, and detail what you've already tried. The more information you provide, the better solutions you'll receive. Include any relevant deadlines, budget constraints, and the impact of solving this problem. Use our guided template to ensure you've covered all important aspects."
      },
      {
        question: "What types of problems can I post?",
        answer: "You can post business challenges, technical problems, academic questions, research topics, or any other issue that needs solving. We support various categories including software development, design, business strategy, academic help, and more. Our platform is designed to accommodate both simple questions and complex multi-faceted challenges."
      },
      {
        question: "How is pricing determined for solutions?",
        answer: "You set your budget range when posting your problem. Our algorithm will match you with solution providers within your price range. You can also opt for our bidding system where problem-solvers propose their rates based on the complexity of your problem. For recurring or complex issues, you can establish milestone-based payments."
      },
      {
        question: "How do I know if a solution provider is qualified?",
        answer: "Each solution provider has a profile showing their expertise, rating, previous solutions, and testimonials. You can review this information before accepting their proposal. We also verify credentials for specialized fields and offer 'Expert' badges to top-performing solution providers with proven expertise in specific domains."
      },
      {
        question: "Can I request revisions to a solution?",
        answer: "Yes, our platform includes a revision request system. You can request up to three rounds of revisions before the solution is finalized. This ensures you get exactly what you need. If additional revisions are required beyond this limit, you and the solution provider can negotiate terms."
      },
      {
        question: "How do I maintain confidentiality for sensitive problems?",
        answer: "You can mark your problem as 'Confidential' which requires solution providers to sign an NDA before viewing the full details. We also offer private channels for communication and secure file sharing. For highly sensitive issues, you can restrict visibility to pre-approved solution providers only."
      }
    ]
  },
  {
    category: "For Solution Providers",
    icon: <MessageCircle />,
    questions: [
      {
        question: "How do I find problems to solve?",
        answer: "You can browse problems by category, industry, or skill set. Our matching algorithm will also recommend problems based on your expertise and past performance. You'll receive notifications for new problems that match your profile. You can also set up custom filters to focus on problems that match your specific interests and expertise level."
      },
      {
        question: "How do I get paid for my solutions?",
        answer: "Payments are securely processed through our platform. Once your solution is accepted, the agreed amount is released from escrow to your account. You can withdraw funds to your bank account or PayPal at any time. We offer multiple payout options including direct deposit, crypto payments, and international wire transfers with competitive exchange rates."
      },
      {
        question: "Can I collaborate with other solution providers?",
        answer: "Yes! For complex problems, you can form teams with other providers. Our platform supports collaborative workspaces, shared documents, and split payments for team efforts. You can invite specific experts to join your team or post collaboration requests on our community board."
      },
      {
        question: "How can I improve my visibility on the platform?",
        answer: "Complete your profile with detailed information about your skills and experience. Consistently deliver high-quality solutions to build positive reviews. Participate in community discussions and contribute to open problems to showcase your expertise. Our algorithm prioritizes active members with specialized skills and positive feedback."
      },
      {
        question: "What happens if a client and I disagree about a solution?",
        answer: "Our platform includes a dispute resolution process. First, we encourage direct communication to resolve issues. If that fails, our mediation team will review the case based on the original requirements, communication history, and delivered work to reach a fair resolution."
      },
      {
        question: "Can I specialize in multiple areas?",
        answer: "Absolutely! You can list multiple specializations on your profile and our algorithm will match you with relevant problems across these areas. You can also set priority levels for different skills to indicate your preferences. Many successful providers maintain expertise in complementary domains."
      },
      {
        question: "How do I set the right price for my services?",
        answer: "Review similar problems on the platform to understand market rates. Consider your expertise level, the complexity of the problem, and estimated time investment. You can start with competitive rates to build your profile and gradually increase your rates as you establish a strong reputation."
      }
    ]
  },
  {
    category: "For Students",
    icon: <Star />,
    questions: [
      {
        question: "How does the coin system work?",
        answer: "Students earn coins by helping others with their academic challenges, participating in discussions, or providing study resources. These coins can then be exchanged for help with your own projects, access to premium study materials, or even mentorship sessions. Coins have different values based on the complexity of tasks - helping with advanced topics earns more coins than basic questions."
      },
      {
        question: "Is academic integrity maintained?",
        answer: "Absolutely. Our platform is designed to facilitate learning and collaboration, not to enable cheating. We have clear guidelines that prohibit sharing exam answers or completing assignments for others. Instead, we focus on explaining concepts, reviewing work, and providing guidance. Our AI system also flags potential academic integrity violations."
      },
      {
        question: "How do I get started as a student?",
        answer: "Register with your educational email to verify your student status. Complete your profile with your field of study, courses, and areas of interest. Start by answering questions in subjects you're strong in to earn your first coins. You'll also receive a welcome bonus of coins to help you get started with asking your own questions."
      },
      {
        question: "Can I get career guidance or internship help?",
        answer: "Yes! Beyond academic help, many industry professionals on our platform offer career advice, resume reviews, and internship opportunity information. You can use your coins for these services or participate in our monthly career workshops. We also partner with companies looking to recruit talented students directly from our platform."
      },
      {
        question: "How can I form study groups?",
        answer: "You can create or join study groups based on your courses, institution, or topics of interest. Study groups have shared workspaces, discussion boards, and file sharing capabilities. You can also organize virtual study sessions through our integrated video conferencing tool."
      },
      {
        question: "Do professors or teachers use this platform?",
        answer: "Yes, many educators join our platform to provide guidance, create learning resources, and identify common knowledge gaps. Verified educators have special badges and can create official course groups. Some institutions even integrate our platform into their curriculum as a collaborative learning tool."
      }
    ]
  },
  {
    category: "Platform & Security",
    icon: <Search />,
    questions: [
      {
        question: "How do you protect my intellectual property?",
        answer: "We have robust IP protection measures. All submissions are timestamped and encrypted. NDAs can be implemented for sensitive projects. Our terms of service clearly outline IP ownership, which typically remains with the problem poster unless otherwise agreed. We also offer digital certificates for original solutions to establish provenance."
      },
      {
        question: "What happens if I'm not satisfied with a solution?",
        answer: "We have a resolution process for disputes. If a solution doesn't meet your requirements, you can request revisions. If issues persist, our mediation team will review the case and determine a fair outcome based on the initial requirements and delivered work. Our platform maintains a satisfaction guarantee with partial refunds available in certain circumstances."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption and never store your full payment details on our servers. We comply with PCI DSS requirements and partner with established payment processors to ensure maximum security. All transactions are monitored for suspicious activity, and we employ two-factor authentication for financial operations."
      },
      {
        question: "How can I contact support?",
        answer: "Our support team is available 24/7 through live chat, email, or phone. For technical issues, you can open a ticket in your dashboard for specialized assistance. We typically respond within 2 hours during business days. Priority support is available for premium members with guaranteed response times."
      },
      {
        question: "How do you verify the identities of users?",
        answer: "We implement a tiered verification system. Basic verification includes email confirmation and phone verification. Advanced verification can include ID checks, professional credential verification, and educational institution confirmation. High-value transactions require additional security measures."
      },
      {
        question: "Can I use the platform on mobile devices?",
        answer: "Yes, Challenge2Solution is fully responsive and works on all devices. We also offer dedicated mobile apps for iOS and Android with features like push notifications, offline access to saved solutions, and secure messaging. The mobile experience is optimized for on-the-go problem solving and collaboration."
      },
      {
        question: "How do you handle data privacy?",
        answer: "We adhere to strict data privacy guidelines including GDPR and CCPA compliance. You control what information is shared and with whom. All data is encrypted both in transit and at rest. You can request a full data export or account deletion at any time through your privacy dashboard."
      }
    ]
  },
  {
    category: "Getting Started",
    icon: <HelpCircle />,
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click the 'Sign Up' button in the top right corner of the homepage. You can register using your email, Google account, or LinkedIn profile. Complete your profile by adding your areas of expertise or interest, and specify whether you're primarily a problem poster, solution provider, or student to customize your dashboard."
      },
      {
        question: "Is there a cost to join Challenge2Solution?",
        answer: "Basic membership is free and allows you to post problems, provide solutions, and participate in the community. Premium memberships are available with added benefits like priority matching, reduced platform fees, advanced analytics, and featured profile placement. We also offer enterprise solutions for organizations with custom pricing."
      },
      {
        question: "What are the different user roles?",
        answer: "Our platform supports multiple roles: Problem Posters (individuals or businesses seeking solutions), Solution Providers (freelancers, experts, or agencies offering solutions), Students (with access to academic resources and peer support), and Mentors (experienced professionals providing guidance). You can switch between roles or maintain multiple roles simultaneously."
      },
      {
        question: "How long does it typically take to receive solutions?",
        answer: "The timeline varies based on the complexity of your problem and your budget. Simple questions often receive responses within hours, while complex projects may take days or weeks. You can set a deadline when posting your problem, and our system will prioritize accordingly. Urgent requests can be highlighted for faster responses."
      }
    ]
  }
];

const testimonials = [
  {
    name: "Sarah J.",
    role: "SaaS Entrepreneur",
    text: "Challenge2Solution helped me validate my business idea and connect with developers who could bring it to life. The platform's structure made it easy to explain my problem and find the right solution providers.",
    rating: 5
  },
  {
    name: "Michael T.",
    role: "Freelance Developer",
    text: "As a freelancer, finding quality clients used to be my biggest challenge. Now I get matched with interesting problems that match my skills, and the payment protection gives me peace of mind.",
    rating: 5
  },
  {
    name: "Priya K.",
    role: "Computer Science Student",
    text: "The coin system is brilliant! I help others with programming basics and earn coins to get help with my advanced AI projects. It's like a knowledge exchange economy that actually works.",
    rating: 4
  }
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const toggleQuestion = (categoryIndex:number, questionIndex:number) => {
    setOpenQuestions(prev => {
      const key = `${categoryIndex}-${questionIndex}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  const isQuestionOpen = (categoryIndex:number, questionIndex:number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    return openQuestions[key] || false;
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length < 3) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Search through all FAQs
    const results = [];
    faqData.forEach((category, categoryIndex) => {
      category.questions.forEach((item, questionIndex) => {
        if (
          item.question.toLowerCase().includes(term.toLowerCase()) ||
          item.answer.toLowerCase().includes(term.toLowerCase())
        ) {
          results.push({
            categoryIndex,
            questionIndex,
            category: category.category,
            ...item
          });
        }
      });
    });
    
    setSearchResults(results);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4" style={{ color: colors.darkPurple }}>
        Frequently Asked Questions
      </h1>
      <p className="text-xl text-center mb-12">
        Find answers to common questions about using Challenge2Solution
      </p>
      
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-12">
        <div className="flex items-center border-2 rounded-full px-4 py-2" 
             style={{ borderColor: colors.lightPurple }}>
          <Search className="h-5 w-5 mr-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        {/* Search Results */}
        {isSearching && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto">
            {searchResults.map((result, index) => (
              <div 
                key={index} 
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setActiveCategory(result.categoryIndex);
                  toggleQuestion(result.categoryIndex, result.questionIndex);
                  setIsSearching(false);
                  setSearchTerm("");
                }}
              >
                <p className="text-sm font-medium text-gray-500">{result.category}</p>
                <h4 className="font-medium">{result.question}</h4>
              </div>
            ))}
          </div>
        )}
        
        {isSearching && searchResults.length === 0 && searchTerm.length >= 3 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-10 p-4 text-center">
            <p>No results found. Try different keywords or <button className="text-indigo-600 font-medium">contact support</button>.</p>
          </div>
        )}
      </div>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 overflow-x-auto">
        {faqData.map((category, index) => (
          <button
            key={index}
            className={`px-5 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
              activeCategory === index 
                ? 'text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{ 
              backgroundColor: activeCategory === index ? colors.darkPurple : '',
            }}
            onClick={() => setActiveCategory(index)}
          >
            {category.icon && <span className="w-5 h-5">{category.icon}</span>}
            {category.category}
          </button>
        ))}
      </div>
      
      {/* FAQ Accordion */}
      <div className="space-y-6">
        {faqData[activeCategory].questions.map((faq, questionIndex) => (
          <div 
            key={questionIndex}
            className={`border rounded-xl transition-all ${
              isQuestionOpen(activeCategory, questionIndex) 
                ? 'shadow-md' 
                : 'border-gray-200'
            }`}
            style={{
              borderColor: isQuestionOpen(activeCategory, questionIndex) 
                ? colors.darkPink 
                : ''
            }}
          >
            <button
              className="flex justify-between items-center w-full p-6 text-left"
              onClick={() => toggleQuestion(activeCategory, questionIndex)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {isQuestionOpen(activeCategory, questionIndex) ? (
                <ChevronUp className="flex-shrink-0 h-5 w-5" style={{ color: colors.darkPink }} />
              ) : (
                <ChevronDown className="flex-shrink-0 h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {isQuestionOpen(activeCategory, questionIndex) && (
              <div className="px-6 pb-6 pt-0">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ color: colors.darkPurple }}>
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border" style={{ borderColor: colors.lightPurple }}>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill={i < testimonial.rating ? colors.darkPink : "none"}
                    color={i < testimonial.rating ? colors.darkPink : colors.gray}
                  />
                ))}
              </div>
              <p className="italic mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="mt-16 text-center p-8 rounded-xl" style={{ backgroundColor: colors.lightPurple }}>
        <h3 className="text-2xl font-bold mb-4" style={{ color: colors.darkPurple }}>
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-6">Our support team is ready to help you get the most out of Challenge2Solution</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="text-white px-8 py-3 rounded-lg font-medium transition-colors" 
                  style={{ backgroundColor: colors.darkPink, hover: { backgroundColor: colors.darkPurple } }}>
            Contact Support
          </button>
          <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-medium border hover:bg-gray-50 transition-colors">
            Browse Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Languages,
  Leaf,
  Menu,
  Mic2,
  Moon,
  Play,
  QrCode,
  Search,
  Send,
  ShieldCheck,
  Star,
  Sun,
  SunMedium,
  Volume2,
  Wheat,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import type { Mesh } from "three";
import heroImage from "../assets/images/sarpanch-hero.png";
import {
  contactTiles,
  developmentFeatures,
  dockItems,
  governmentSchemes,
  kisanActions,
  metrics,
  schemeCategories,
  timeline,
  updates,
} from "../data/portalData";
import type { GovernmentScheme, SchemeCategory } from "../data/portalData";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

type Mode = "standard" | "kisan";
type Language = "en" | "hi";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const LanguageContext = createContext<Language>("hi");

const hiCopy: Record<string, string> = {
  "Standard": "सामान्य",
  "Kisan": "किसान",
  "Weather": "मौसम",
  "Hindi / English": "हिंदी / English",
  "Dark mode": "डार्क मोड",
  "Light mode": "लाइट मोड",
  "Suryapura": "सूर्यपुरा",
  "Gram Vikas": "ग्राम विकास",
  "Village": "गांव",
  "Development": "विकास",
  "Schemes": "योजनाएं",
  "School": "स्कूल",
  "Krishi": "कृषि",
  "Home": "घर",
  "Chaupal": "चौपाल",
  "Gram Score 91% live": "ग्राम स्कोर 91% लाइव",
  "Suryapura Portal": "सूर्यपुरा पोर्टल",
  "A premium digital Panchayat platform made for real village life: farmers in bright sun, parents at school gates, and citizens who want answers without waiting in lines.": "यह गांव के असली जीवन के लिए बना डिजिटल पंचायत पोर्टल है: किसान, स्कूल जाने वाले बच्चे, माता-पिता और वे नागरिक जिन्हें बिना लाइन लगाए तुरंत जानकारी चाहिए।",
  "Explore Village": "गांव देखें",
  "Government Schemes": "सरकारी योजनाएं",
  "Digital Panchayat": "डिजिटल पंचायत",
  "Education": "शिक्षा",
  "Agriculture": "कृषि",
  "Identity": "पहचान",
  "Visionary Leader": "दूरदर्शी नेतृत्व",
  "Tech in one hand, mitti in the heart.": "हाथ में तकनीक, दिल में मिट्टी।",
  "100% School Map": "100% स्कूल मैप",
  "Smart Panchayat": "स्मार्ट पंचायत",
  "Organic Push": "जैविक खेती बढ़ावा",
  "Live village pulse": "गांव की लाइव जानकारी",
  "Every promise becomes a number citizens can see.": "हर वादा अब ऐसे आंकड़े में बदलता है जिसे नागरिक देख सकें।",
  "The dashboard turns rural development into a shared scoreboard for trust, pride, and faster action.": "यह डैशबोर्ड गांव के विकास को भरोसे, गर्व और तेज काम के लिए साझा स्कोरबोर्ड बनाता है।",
  "Development OS": "विकास व्यवस्था",
  "A Panchayat command center that feels local, not corporate.": "ऐसा पंचायत कमांड सेंटर जो अपना लगे, दूर का नहीं।",
  "Fast, visual workflows keep the portal usable for citizens, teachers, farmers, staff, and the Sarpanch's office.": "तेज और साफ दृश्य व्यवस्था से यह पोर्टल नागरिकों, शिक्षकों, किसानों, कर्मचारियों और सरपंच कार्यालय सबके लिए आसान बनता है।",
  "Kisan Mode": "किसान मोड",
  "Massive taps. High contrast. No tiny text.": "बड़े बटन, साफ रंग, छोटा अक्षर नहीं।",
  "The interface strips away decoration and prioritizes the three decisions farmers check most: scheme eligibility, weather timing, and crop price movement.": "इस मोड में सजावट कम और किसान की जरूरत ज्यादा है: योजना पात्रता, मौसम का समय और फसल का भाव।",
  "Government schemes": "सरकारी योजनाएं",
  "One desk for farmers, students, women, housing, health, and certificates.": "किसान, विद्यार्थी, महिलाएं, मकान, स्वास्थ्य और प्रमाणपत्र के लिए एक ही जगह।",
  "Click a scheme to see eligibility, documents, deadlines, and a simulated application draft. This is the part that makes the portal feel operational.": "किसी योजना पर क्लिक करके पात्रता, जरूरी कागज, अंतिम तारीख और आवेदन ड्राफ्ट देखें। यही हिस्सा पोर्टल को काम का बनाता है।",
  "Search PM-Kisan, scholarship, health card...": "पीएम-किसान, छात्रवृत्ति, हेल्थ कार्ड खोजें...",
  "All": "सभी",
  "Farmers": "किसान",
  "Students": "विद्यार्थी",
  "Women": "महिलाएं",
  "Housing": "मकान",
  "Health": "स्वास्थ्य",
  "Documents": "कागज",
  "Priority": "जरूरी",
  "Camp Soon": "जल्द शिविर",
  "Open": "खुला",
  "Details": "विवरण",
  "Apply": "आवेदन",
  "Draft": "ड्राफ्ट",
  "Save": "सहेजें",
  "Saved": "सहेजा",
  "Showing": "दिख रही हैं",
  "schemes": "योजनाएं",
  "Drafts": "ड्राफ्ट",
  "Eligibility": "पात्रता",
  "Deadline": "अंतिम तारीख",
  "Documents needed": "जरूरी कागज",
  "Draft Ready": "ड्राफ्ट तैयार",
  "Start Apply": "आवेदन शुरू",
  "Scheme Saved": "योजना सहेजी",
  "Save Scheme": "योजना सहेजें",
  "Call Sevak": "सेवक को बुलाएं",
  "School progress that parents can trust.": "स्कूल की प्रगति जिस पर माता-पिता भरोसा कर सकें।",
  "Attendance heatmap": "हाजिरी रिपोर्ट",
  "94% average attendance across primary and secondary classes.": "प्राथमिक और माध्यमिक कक्षाओं में औसत हाजिरी 94% है।",
  "Scholarship watch": "छात्रवृत्ति निगरानी",
  "312 applications verified with missing-document alerts.": "312 आवेदन जांचे गए और अधूरे कागजों की सूचना दी गई।",
  "Smart classroom": "स्मार्ट कक्षा",
  "18 rooms live, 7 repairs scheduled, 4 teacher trainings planned.": "18 कमरे चालू, 7 मरम्मत तय, 4 शिक्षक प्रशिक्षण योजना में।",
  "Panchayat": "पंचायत",
  "The office becomes a live service desk.": "पंचायत कार्यालय अब लाइव सेवा केंद्र बनता है।",
  "Citizen Requests": "नागरिक अनुरोध",
  "Live": "लाइव",
  "Birth certificate": "जन्म प्रमाणपत्र",
  "2 hr avg response": "औसत जवाब 2 घंटे",
  "Streetlight repair": "स्ट्रीट लाइट मरम्मत",
  "17 open tickets": "17 खुले टिकट",
  "Water pipeline": "पानी पाइपलाइन",
  "Ward 8 priority": "वार्ड 8 प्राथमिकता",
  "Farm intelligence that speaks like the village.": "कृषि जानकारी गांव की भाषा में।",
  "Weather, soil, mandi, irrigation, livestock, and subsidy status are grouped around daily decisions instead of department names.": "मौसम, मिट्टी, मंडी, सिंचाई, पशुपालन और सब्सिडी की जानकारी विभागों के नाम से नहीं, रोज के फैसलों के हिसाब से रखी गई है।",
  "Digital Chaupal": "डिजिटल चौपाल",
  "Voice-first help desk": "बोलकर मदद पाने की चौपाल",
  "Response": "जवाब",
  "Digital identity": "डिजिटल पहचान",
  "Certificates, records, and proof move at portal speed.": "प्रमाणपत्र, रिकॉर्ड और सबूत अब पोर्टल की गति से चलते हैं।",
  "Aadhaar-linked services, QR verification, property extracts, birth certificates, and online requests are designed as trackable citizen journeys.": "आधार से जुड़ी सेवाएं, QR जांच, संपत्ति रिकॉर्ड, जन्म प्रमाणपत्र और ऑनलाइन अनुरोध अब ट्रैक किए जा सकते हैं।",
  "Mobile QR": "मोबाइल QR",
  "Suryapura app link": "सूर्यपुरा ऐप लिंक",
  "Demo QR for the village mobile portal. Copy opens the same local app URL.": "यह गांव के मोबाइल पोर्टल का डेमो QR है। कॉपी करने पर यही ऐप लिंक खुलेगा।",
  "Copy Link": "लिंक कॉपी",
  "Done": "ठीक है",
  "Mobile first": "मोबाइल पहले",
  "The portal feels native even on a 320px phone.": "यह पोर्टल छोटे 320px फोन पर भी साफ और आसान लगता है।",
  "A sticky dock keeps the four most important village tasks one thumb away: Home, School, Krishi, and Chaupal.": "नीचे की पट्टी से चार जरूरी काम हमेशा पास रहते हैं: घर, स्कूल, कृषि और चौपाल।",
  "Launch Portal": "पोर्टल खोलें",
  "App QR": "ऐप QR",
  "Kisan dashboard": "किसान डैशबोर्ड",
  "Suryapura Gram Vikas Portal": "सूर्यपुरा ग्राम विकास पोर्टल",
  "Built as a modern rural SaaS experience for governance, education, agriculture, identity, and community participation.": "शासन, शिक्षा, कृषि, पहचान और जनभागीदारी के लिए आधुनिक ग्रामीण डिजिटल अनुभव।",
  "Your irrigation subsidy file is verified. Payment is expected in the next district release.": "आपकी सिंचाई सब्सिडी फाइल सत्यापित हो गई है। भुगतान अगले जिला रिलीज में आने की उम्मीद है।",
  "PM-Kisan status batao": "पीएम-किसान स्थिति बताओ",
  "PM-Kisan e-KYC is pending for 27 farmers. Camp desk opens Friday at 10 AM.": "27 किसानों की पीएम-किसान e-KYC बाकी है। शिविर डेस्क शुक्रवार सुबह 10 बजे खुलेगी।",
  "Kal barish hogi kya?": "कल बारिश होगी क्या?",
  "Rain chance is 62% tomorrow. Avoid pesticide spray until the evening wind drops.": "कल बारिश की संभावना 62% है। शाम को हवा कम होने तक दवा का छिड़काव न करें।",
  "Meri complaint ka number kya hai?": "मेरी शिकायत का नंबर क्या है?",
  "Your latest water pipeline complaint is SRP-2048 and is assigned to Ward 8 team.": "आपकी पानी पाइपलाइन शिकायत SRP-2048 है और यह वार्ड 8 टीम को दी गई है।",
  "Voice help paused. Tap the mic again to ask Digital Chaupal.": "आवाज मदद रुकी है। फिर पूछने के लिए माइक दबाएं।",
  "Listening... try one of the sample Hindi questions below.": "सुन रहा है... नीचे दिए सवालों में से कोई सवाल दबाएं।",
  "Digital Chaupal paused.": "डिजिटल चौपाल रुकी।",
  "Digital Chaupal is listening.": "डिजिटल चौपाल सुन रही है।",
  "Digital Chaupal answered your voice prompt.": "डिजिटल चौपाल ने जवाब दे दिया।",
  "Portal link copied.": "पोर्टल लिंक कॉपी हो गया।",
};

const hiDataCopy: Record<string, string> = {
  "Population served": "लाभ पाने वाली आबादी",
  "Farmers enrolled": "जुड़े किसान",
  "Students tracked": "जुड़े विद्यार्थी",
  "Gram Score": "ग्राम स्कोर",
  "Water projects": "जल परियोजनाएं",
  "Digital requests": "डिजिटल आवेदन",
  "Transparent Panchayat": "पारदर्शी पंचायत",
  "Open budgets": "खुला बजट",
  "Meetings, tenders, project spend, and delivery photos in one citizen dashboard.": "बैठक, टेंडर, खर्च और काम की फोटो एक ही नागरिक डैशबोर्ड में।",
  "School Mission": "स्कूल मिशन",
  "Every child visible": "हर बच्चा दिखे",
  "Attendance, scholarships, smart classroom repairs, and girl education support.": "हाजिरी, छात्रवृत्ति, स्मार्ट कक्षा मरम्मत और बालिका शिक्षा सहायता।",
  "Krishi Command": "कृषि कमांड",
  "Farm-first tools": "किसान पहले साधन",
  "Weather alerts, mandi prices, soil health, crop advisory, and scheme eligibility.": "मौसम अलर्ट, मंडी भाव, मिट्टी स्वास्थ्य, फसल सलाह और योजना पात्रता।",
  "Digital Identity": "डिजिटल पहचान",
  "Less paperwork": "कम कागजी काम",
  "Birth certificates, property records, QR verification, and request tracking.": "जन्म प्रमाणपत्र, संपत्ति रिकॉर्ड, QR जांच और आवेदन ट्रैकिंग।",
  "15 open": "15 खुली",
  "PM-Kisan, seed subsidy, scholarships, housing, health, and certificates.": "पीएम-किसान, बीज सहायता, छात्रवृत्ति, मकान, स्वास्थ्य और प्रमाणपत्र।",
  "Rain 62%": "बारिश 62%",
  "Spray advisory: wait 18 hours. Strong wind after 4 PM.": "छिड़काव सलाह: 18 घंटे रुकें। शाम 4 बजे के बाद तेज हवा।",
  "Crop Price": "फसल भाव",
  "Wheat 2,420": "गेहूं 2,420",
  "Mandi trend is up 4.8%. Nearby procurement window opens Monday.": "मंडी भाव 4.8% ऊपर है। नजदीकी खरीद सोमवार से शुरू।",
  "New solar streetlight tender published for Ward 4 and Ward 7.": "वार्ड 4 और वार्ड 7 के लिए सोलर स्ट्रीट लाइट टेंडर जारी।",
  "Scholarship verification camp starts at Suryapura School from 10 AM.": "सूर्यपुरा स्कूल में छात्रवृत्ति जांच शिविर सुबह 10 बजे से।",
  "Panchayat water dashboard updated with 42 live handpump service records.": "पंचायत जल डैशबोर्ड में 42 हैंडपंप सेवा रिकॉर्ड अपडेट।",
  "Digital Birth Records": "डिजिटल जन्म रिकॉर्ड",
  "Smart Classrooms": "स्मार्ट कक्षाएं",
  "AI Chaupal Desk": "AI चौपाल डेस्क",
  "Village Health Map": "गांव स्वास्थ्य मैप",
  "Helpline": "हेल्पलाइन",
  "Dairy route": "दूध रूट",
  "Road works": "सड़क कार्य",
  "PM-Kisan Samman Nidhi": "पीएम-किसान सम्मान निधि",
  "Small and marginal farmer families": "छोटे और सीमांत किसान परिवार",
  "Rs. 6,000 yearly direct benefit in three installments.": "सालाना 6,000 रुपये तीन किस्तों में सीधे खाते में।",
  "Landholding farmer family with active bank and Aadhaar linkage.": "जमीन वाले किसान परिवार, बैंक और आधार लिंक जरूरी।",
  "e-KYC camp: 30 June": "e-KYC शिविर: 30 जून",
  "Soil Health Card": "मिट्टी स्वास्थ्य कार्ड",
  "All cultivators": "सभी खेती करने वाले किसान",
  "Free soil testing with crop-wise fertilizer recommendations.": "मुफ्त मिट्टी जांच और फसल के हिसाब से खाद सलाह।",
  "Any farmer cultivating land in Suryapura revenue boundary.": "सूर्यपुरा सीमा में खेती करने वाला कोई भी किसान।",
  "Samples accepted weekly": "हर सप्ताह नमूना लिया जाएगा",
  "Micro Irrigation Subsidy": "सूक्ष्म सिंचाई सब्सिडी",
  "Vegetable, fruit, and water-stressed farms": "सब्जी, फल और पानी की कमी वाले खेत",
  "Subsidy support for drip and sprinkler irrigation installation.": "ड्रिप और स्प्रिंकलर सिंचाई लगाने में सब्सिडी सहायता।",
  "Farmers with verified land record and water source declaration.": "सत्यापित जमीन रिकॉर्ड और पानी स्रोत घोषणा वाले किसान।",
  "Ward camp: 4 July": "वार्ड शिविर: 4 जुलाई",
  "Kisan Credit Card": "किसान क्रेडिट कार्ड",
  "Crop, dairy, and fisheries households": "फसल, डेयरी और मछली पालन परिवार",
  "Working capital credit for seeds, feed, fertilizer, and farm needs.": "बीज, चारा, खाद और खेती जरूरतों के लिए ऋण सुविधा।",
  "Farmer, tenant farmer, dairy owner, or SHG-linked producer.": "किसान, बटाईदार, डेयरी मालिक या SHG से जुड़ा उत्पादक।",
  "Bank desk open Friday": "बैंक डेस्क शुक्रवार को खुला",
  "Pre-Matric Scholarship": "प्री-मैट्रिक छात्रवृत्ति",
  "Class 1-10 students": "कक्षा 1 से 10 के विद्यार्थी",
  "Fee and learning support for eligible school children.": "पात्र बच्चों को फीस और पढ़ाई में सहायता।",
  "Student enrolled in recognized school with income certificate.": "मान्यता प्राप्त स्कूल में पढ़ने वाला विद्यार्थी और आय प्रमाणपत्र।",
  "School verification: 10 July": "स्कूल जांच: 10 जुलाई",
  "Balika Cycle Sahayata": "बालिका साइकिल सहायता",
  "Girls entering secondary school": "माध्यमिक स्कूल में जाने वाली बालिकाएं",
  "Cycle assistance for safe travel to school.": "स्कूल आने-जाने के लिए साइकिल सहायता।",
  "Girl student enrolled in Class 9 or nearby secondary school.": "कक्षा 9 या नजदीकी माध्यमिक स्कूल में पढ़ती बालिका।",
  "Principal desk: Monday": "प्रधानाध्यापक डेस्क: सोमवार",
  "Digital Learning Device Support": "डिजिटल पढ़ाई उपकरण सहायता",
  "Merit and need-based students": "मेधावी और जरूरतमंद विद्यार्थी",
  "Tablet/library-device access through school digital room.": "स्कूल डिजिटल कक्ष से टैबलेट या लाइब्रेरी उपकरण सुविधा।",
  "Teacher verified student needing digital learning access.": "शिक्षक द्वारा सत्यापित डिजिटल पढ़ाई की जरूरत वाला विद्यार्थी।",
  "Review every Saturday": "हर शनिवार समीक्षा",
  "Anganwadi Nutrition Plus": "आंगनवाड़ी पोषण प्लस",
  "Pregnant women, lactating mothers, and children": "गर्भवती महिलाएं, दूध पिलाने वाली माताएं और बच्चे",
  "Nutrition kit tracking, health visits, and growth monitoring.": "पोषण किट, स्वास्थ्य भेंट और बच्चे की वृद्धि निगरानी।",
  "Registered with Anganwadi or ASHA worker in village ward.": "गांव वार्ड की आंगनवाड़ी या आशा कार्यकर्ता के पास पंजीकृत।",
  "Health day: 5 July": "स्वास्थ्य दिवस: 5 जुलाई",
  "Women SHG Livelihood Loan": "महिला SHG आजीविका ऋण",
  "Self-help group members": "स्वयं सहायता समूह सदस्य",
  "Credit linkage and training for dairy, tailoring, food, and retail work.": "डेयरी, सिलाई, खाद्य और दुकान कार्य के लिए ऋण और प्रशिक्षण।",
  "Active SHG member with group meeting and repayment record.": "सक्रिय SHG सदस्य, बैठक और भुगतान रिकॉर्ड सहित।",
  "Cluster meeting: Wednesday": "क्लस्टर बैठक: बुधवार",
  "Ujjwala LPG Connection": "उज्ज्वला LPG कनेक्शन",
  "Eligible women from low-income households": "कम आय परिवार की पात्र महिलाएं",
  "LPG connection support for cleaner household cooking.": "स्वच्छ रसोई के लिए LPG कनेक्शन सहायता।",
  "Adult woman from eligible household without LPG connection.": "पात्र परिवार की वयस्क महिला जिसके घर LPG नहीं है।",
  "Open this month": "इस महीने खुला",
  "PM Awas Gramin": "प्रधानमंत्री आवास ग्रामीण",
  "Families needing pucca housing": "पक्का मकान चाहने वाले परिवार",
  "Housing assistance with geo-tagged progress tracking.": "मकान सहायता और फोटो आधारित प्रगति ट्रैकिंग।",
  "Eligible household listed through village housing verification.": "गांव आवास जांच में सूचीबद्ध पात्र परिवार।",
  "Verification round active": "जांच चल रही है",
  "Swachh Bharat Toilet Support": "स्वच्छ भारत शौचालय सहायता",
  "Households without functional toilets": "शौचालय रहित परिवार",
  "Toilet construction support and completion verification.": "शौचालय निर्माण सहायता और पूरा होने की जांच।",
  "Household verified by Panchayat sanitation worker.": "पंचायत सफाई कर्मचारी द्वारा सत्यापित परिवार।",
  "Ward survey: Friday": "वार्ड सर्वे: शुक्रवार",
  "Ayushman Bharat Health Card": "आयुष्मान भारत हेल्थ कार्ड",
  "Eligible families": "पात्र परिवार",
  "Health coverage and hospital access through verified family card.": "सत्यापित परिवार कार्ड से स्वास्थ्य सुविधा और अस्पताल पहुंच।",
  "Family listed as eligible in health beneficiary database.": "स्वास्थ्य लाभार्थी सूची में पात्र परिवार।",
  "Health camp: Sunday": "स्वास्थ्य शिविर: रविवार",
  "Disability Pension Assistance": "दिव्यांग पेंशन सहायता",
  "Persons with benchmark disability": "दिव्यांगजन",
  "Monthly pension support and certificate-linked service tracking.": "मासिक पेंशन सहायता और प्रमाणपत्र आधारित सेवा ट्रैकिंग।",
  "Disability certificate and resident verification required.": "दिव्यांग प्रमाणपत्र और निवासी जांच जरूरी।",
  "Pension desk: Thursday": "पेंशन डेस्क: गुरुवार",
  "Certificate Service Desk": "प्रमाणपत्र सेवा डेस्क",
  "Students, families, and job applicants": "विद्यार्थी, परिवार और नौकरी आवेदक",
  "Birth, caste, income, residence, and property record requests.": "जन्म, जाति, आय, निवास और संपत्ति रिकॉर्ड आवेदन।",
  "Village resident with supporting record or ward verification.": "गांव निवासी, सहायक रिकॉर्ड या वार्ड जांच सहित।",
  "Digital requests open 24/7": "डिजिटल आवेदन 24/7 खुले",
  "Aadhaar": "आधार",
  "Bank passbook": "बैंक पासबुक",
  "Land record": "जमीन रिकॉर्ड",
  "Mobile number": "मोबाइल नंबर",
  "Land plot number": "खसरा/प्लॉट नंबर",
  "Farmer ID": "किसान ID",
  "Crop details": "फसल जानकारी",
  "Dealer quotation": "डीलर कोटेशन",
  "Bank account": "बैंक खाता",
  "Land or activity proof": "जमीन या काम का प्रमाण",
  "Photo": "फोटो",
  "Student Aadhaar": "विद्यार्थी आधार",
  "School ID": "स्कूल ID",
  "Income certificate": "आय प्रमाणपत्र",
  "School certificate": "स्कूल प्रमाणपत्र",
  "Parent mobile": "अभिभावक मोबाइल",
  "Bank details": "बैंक जानकारी",
  "Teacher note": "शिक्षक नोट",
  "Parent consent": "अभिभावक सहमति",
  "Mother card": "माता कार्ड",
  "SHG passbook": "SHG पासबुक",
  "Activity plan": "काम की योजना",
  "Ration card": "राशन कार्ड",
  "Address proof": "पता प्रमाण",
  "Job card": "जॉब कार्ड",
  "Land proof": "जमीन प्रमाण",
  "House photo": "घर की फोटो",
  "Disability certificate": "दिव्यांग प्रमाणपत्र",
  "Application form": "आवेदन फॉर्म",
  "Supporting proof": "सहायक प्रमाण",
};

function translate(language: Language, text: string) {
  return language === "hi" ? hiCopy[text] ?? hiDataCopy[text] ?? text : text;
}

function useT() {
  const language = useContext(LanguageContext);
  return (text: string) => translate(language, text);
}

function localizeScheme(scheme: GovernmentScheme, language: Language) {
  return {
    ...scheme,
    title: translate(language, scheme.title),
    categoryLabel: translate(language, scheme.category),
    audience: translate(language, scheme.audience),
    benefit: translate(language, scheme.benefit),
    eligibility: translate(language, scheme.eligibility),
    deadline: translate(language, scheme.deadline),
    statusLabel: translate(language, scheme.status),
    documents: scheme.documents.map((document) => translate(language, document)),
  };
}

function SunField() {
  const mesh = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.elapsedTime * 0.16;
    mesh.current.rotation.y = clock.elapsedTime * 0.22;
  });

  return (
    <mesh ref={mesh} position={[0.5, 0, 0]}>
      <icosahedronGeometry args={[1.35, 1]} />
      <meshStandardMaterial
        color="#ffb300"
        emissive="#ffb300"
        emissiveIntensity={0.32}
        roughness={0.42}
        metalness={0.08}
      />
    </mesh>
  );
}

function AmbientVillageScene() {
  return (
    <div className="pointer-events-none absolute inset-y-16 right-0 hidden w-[34vw] min-w-96 opacity-80 lg:block">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 3, 5]} intensity={1.25} />
        <SunField />
      </Canvas>
    </div>
  );
}

function ModeToggle({
  mode,
  setMode,
  compact = false,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
  compact?: boolean;
}) {
  const t = useT();
  const isKisan = mode === "kisan";

  return (
    <div
      className={`grid grid-cols-2 border border-white/35 bg-white/80 dark:bg-slate-900/80 dark:border-white/10 p-1 shadow-sm backdrop-blur-xl ${
        compact ? "h-12 rounded-full text-sm" : "h-14 rounded-full text-base"
      }`}
      role="group"
      aria-label="Portal mode"
    >
      <button
        className={`rounded-full px-4 font-bold transition ${
          !isKisan ? "bg-ink text-white shadow-md dark:bg-yellow-300 dark:text-black" : "text-slate-700 dark:text-slate-300"
        }`}
        type="button"
        onClick={() => setMode("standard")}
      >
        {t("Standard")}
      </button>
      <button
        className={`flex items-center justify-center gap-2 rounded-full px-4 font-bold transition ${
          isKisan ? "bg-yellow-300 text-black shadow-md" : "text-slate-700 dark:text-slate-300"
        }`}
        type="button"
        onClick={() => setMode("kisan")}
      >
        <Wheat className="h-5 w-5" />
        {t("Kisan")}
      </button>
    </div>
  );
}

function MobileModeBar({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
}) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-leaf-900/92 px-3 py-3 backdrop-blur-xl md:hidden">
      <ModeToggle mode={mode} setMode={setMode} />
    </div>
  );
}

function Navbar({
  mode,
  setMode,
  language,
  darkMode,
  onLanguageToggle,
  onDarkModeToggle,
}: {
  mode: Mode;
  setMode: (mode: Mode) => void;
  language: Language;
  darkMode: boolean;
  onLanguageToggle: () => void;
  onDarkModeToggle: () => void;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const links =
    language === "hi"
      ? [
          ["गांव", "village"],
          ["विकास", "development"],
          ["योजनाएं", "schemes"],
          ["स्कूल", "school"],
          ["कृषि", "krishi"],
        ]
      : [
          ["Village", "village"],
          ["Development", "development"],
          ["Schemes", "schemes"],
          ["School", "school"],
          ["Krishi", "krishi"],
        ];

  return (
    <header className="fixed inset-x-0 top-[73px] z-40 px-3 md:top-4 md:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-lg border border-white/35 bg-white/82 px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-2xl">
        <a className="flex items-center gap-3" href="#home" aria-label="Suryapura Home">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-leaf-700 text-white">
            <SunMedium className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-base font-black text-ink">
              {t("Suryapura")}
            </span>
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-leaf-700">
              {t("Gram Vikas")}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([label, target]) => (
            <a
              className="rounded-md px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-leaf-50 hover:text-leaf-800"
              href={`#${target}`}
              key={target}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle compact mode={mode} setMode={setMode} />
          <button
            className="icon-button"
            type="button"
            aria-label="Change language"
            onClick={onLanguageToggle}
            title="Toggle Hindi labels"
          >
            <Languages className="h-5 w-5" />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Dark mode"
            onClick={onDarkModeToggle}
            title="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <button
          className="icon-button md:hidden"
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-2 grid max-w-7xl gap-2 rounded-lg border border-white/35 bg-white/95 p-3 shadow-lg backdrop-blur-xl md:hidden">
          {links.map(([label, target]) => (
            <a
              className="rounded-md px-4 py-3 text-sm font-extrabold text-slate-800"
              href={`#${target}`}
              key={target}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-2">
            <button className="secondary-button min-h-11 px-3 text-xs" type="button" onClick={onLanguageToggle}>
              <Languages className="h-4 w-4" />
              {t("Hindi / English")}
            </button>
            <button className="secondary-button min-h-11 px-3 text-xs" type="button" onClick={onDarkModeToggle}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {darkMode ? t("Light mode") : t("Dark mode")}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  const t = useT();
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="section-eyebrow">{t(eyebrow)}</span>
      <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink md:text-5xl">
        {t(title)}
      </h2>
      {text ? <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{t(text)}</p> : null}
    </div>
  );
}

function Hero({ mode }: { mode: Mode }) {
  const t = useT();
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || shouldReduceMotion) return;

    const context = gsap.context(() => {
      gsap.to(".hero-photo", {
        scale: 1.04,
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".ticker-track", {
        xPercent: -50,
        duration: 26,
        repeat: -1,
        ease: "none",
      });
    }, heroRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      className={`relative isolate min-h-screen overflow-hidden bg-paper pt-44 md:pt-32 ${
        mode === "kisan" ? "kisan-hero" : ""
      }`}
      id="home"
      ref={heroRef}
    >
      <AmbientVillageScene />
      <div className="absolute inset-0 -z-10 bg-grid-soft bg-[length:34px_34px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-[linear-gradient(180deg,rgba(214,239,216,0.9),rgba(250,250,250,0))] dark:bg-[linear-gradient(180deg,rgba(27,94,32,0.15),rgba(6,15,10,0))]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-6">
        <motion.div
          animate="visible"
          className="relative z-10"
          initial="hidden"
          transition={{ duration: 0.7, ease: "easeOut" }}
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-leaf-700/15 bg-white/80 px-3 py-2 text-sm font-extrabold text-leaf-800 shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            {t("Gram Score 91% live")}
          </div>
          <h1 className="mt-7 font-display text-5xl font-black leading-[0.95] text-ink md:text-7xl xl:text-8xl">
            {t("Suryapura Portal")}
          </h1>
          <p className="mt-5 max-w-2xl font-devanagari text-3xl font-extrabold leading-tight text-leaf-800 md:text-5xl">
            मेरा गांव. मेरी पहचान. मेरा अभिमान.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            {t("A premium digital Panchayat platform made for real village life: farmers in bright sun, parents at school gates, and citizens who want answers without waiting in lines.")}
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
            <a className="primary-button hero-cta" href="#development">
              {t("Explore Village")}
              <ArrowRight className="h-5 w-5" />
            </a>
            <a className="secondary-button hero-cta" href="#schemes">
              {t("Government Schemes")}
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {["Digital Panchayat", "Education", "Agriculture", "Identity"].map((item) => (
              <span className="rounded-lg border border-leaf-700/10 bg-white/75 dark:bg-slate-900/60 dark:border-white/5 dark:text-slate-200 px-3 py-3 text-sm font-extrabold text-slate-700 shadow-sm backdrop-blur" key={item}>
                {t(item)}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative"
          initial={{ opacity: 0, y: 36 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-lg border border-white/50 bg-white shadow-glow">
            <img
              alt="A young Suryapura Sarpanch using a tablet in a green farm"
              className="hero-photo aspect-[4/3] w-full object-cover md:aspect-[5/4]"
              src={heroImage}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0)_45%,rgba(15,23,42,0.72))]" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="rounded-lg border border-white/25 bg-white/15 p-4 text-white shadow-2xl backdrop-blur-xl">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                  {t("Visionary Leader")}
                </span>
                <p className="mt-2 text-xl font-black leading-snug md:text-2xl">
                  {t("Tech in one hand, mitti in the heart.")}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
            {["100% School Map", "Smart Panchayat", "Organic Push"].map((badge) => (
              <div className="rounded-lg border border-white/60 bg-white/90 dark:bg-slate-900/90 dark:border-white/10 dark:text-slate-200 px-3 py-3 text-center text-xs font-black text-slate-800 shadow-xl backdrop-blur" key={badge}>
                {t(badge)}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="border-y border-leaf-700/10 bg-white/80 dark:bg-slate-950/60 dark:border-white/5 py-3 backdrop-blur">
        <div className="ticker-track flex w-[200%] gap-4 whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.16em] text-leaf-800">
          {[...updates, ...updates, ...updates, ...updates].map((item, index) => (
            <span className="flex items-center gap-4" key={`${item}-${index}`}>
              <Leaf className="h-4 w-4 text-amber-rural" />
              {t(item)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metrics({ mode }: { mode: Mode }) {
  const t = useT();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-band bg-white" id="village" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeader
          eyebrow="Live village pulse"
          title="Every promise becomes a number citizens can see."
          text="The dashboard turns rural development into a shared scoreboard for trust, pride, and faster action."
        />
        <div className={`mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${mode === "kisan" ? "kisan-metrics" : ""}`}>
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.article
                className="metric-card"
                initial="hidden"
                key={metric.label}
                transition={{ duration: 0.45 }}
                variants={fadeUp}
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <div className={`grid h-12 w-12 place-items-center rounded-lg text-white ${metric.tone}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="mt-5 block text-4xl font-black text-ink md:text-5xl">
                  {inView ? <CountUp duration={2} end={metric.value} separator="," /> : "0"}
                  {metric.suffix ?? ""}
                </span>
                <p className="mt-2 text-sm font-bold text-slate-500">{t(metric.label)}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Development({ mode }: { mode: Mode }) {
  const t = useT();
  return (
    <section className="section-band bg-paper" id="development">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <SectionHeader
          eyebrow="Development OS"
          title="A Panchayat command center that feels local, not corporate."
          text="Fast, visual workflows keep the portal usable for citizens, teachers, farmers, staff, and the Sarpanch's office."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {developmentFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                className={`feature-card ${mode === "kisan" ? "feature-card-kisan" : ""}`}
                initial="hidden"
                key={feature.title}
                transition={{ duration: 0.45 }}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                whileInView="visible"
                viewport={{ once: true, amount: 0.28 }}
              >
                <div className={`mb-6 grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br ${feature.tone} text-white`}>
                  <Icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-leaf-700">
                  {t(feature.eyebrow)}
                </span>
                <h3 className="mt-3 text-2xl font-black text-ink">{t(feature.title)}</h3>
                <p className="mt-3 leading-7 text-slate-600">{t(feature.detail)}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function KisanModePanel({
  mode,
  onAction,
}: {
  mode: Mode;
  onAction: (action: string) => void;
}) {
  const t = useT();
  return (
    <section className={`section-band ${mode === "kisan" ? "bg-black text-white" : "bg-leaf-900 text-white"}`} id="kisan-mode">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="section-eyebrow border-white/20 bg-white/10 text-yellow-200">
              {t("Kisan Mode")}
            </span>
            <h2 className="mt-4 font-display text-4xl font-black leading-tight md:text-6xl">
              {t("Massive taps. High contrast. No tiny text.")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              {t("The interface strips away decoration and prioritizes the three decisions farmers check most: scheme eligibility, weather timing, and crop price movement.")}
            </p>
          </div>

          <div className={`grid gap-4 ${mode === "kisan" ? "sm:grid-cols-1" : "sm:grid-cols-3"}`}>
            {kisanActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  type="button"
                  onClick={() => onAction(action.title)}
                  className={`rounded-lg border border-white/15 p-5 shadow-2xl ${
                    mode === "kisan"
                      ? "bg-white text-black"
                      : "bg-white/10 text-white backdrop-blur-xl"
                  } text-left transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-yellow-300/40`}
                  initial={{ opacity: 0, y: 24 }}
                  key={action.title}
                  transition={{ duration: 0.45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className={`grid place-items-center rounded-lg ${action.tone} ${mode === "kisan" ? "h-24 w-24" : "h-14 w-14"}`}>
                    <Icon className={mode === "kisan" ? "h-12 w-12" : "h-7 w-7"} />
                  </div>
                  <h3 className={`mt-5 font-black ${mode === "kisan" ? "text-4xl" : "text-2xl"}`}>{t(action.title)}</h3>
                  <p className={`mt-2 font-black ${mode === "kisan" ? "text-3xl text-leaf-800" : "text-xl text-yellow-200"}`}>{t(action.value)}</p>
                  <p className={`mt-3 leading-7 ${mode === "kisan" ? "text-xl font-bold text-slate-800" : "text-white/75"}`}>{t(action.detail)}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SchemeModal({
  scheme,
  saved,
  applied,
  onClose,
  onApply,
  onSave,
  onNotify,
}: {
  scheme: GovernmentScheme | null;
  saved: boolean;
  applied: boolean;
  onClose: () => void;
  onApply: (scheme: GovernmentScheme) => void;
  onSave: (scheme: GovernmentScheme) => void;
  onNotify: (message: string) => void;
}) {
  const language = useContext(LanguageContext);
  const t = useT();
  if (!scheme) return null;
  const localizedScheme = localizeScheme(scheme, language);
  const Icon = scheme.icon;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-end bg-slate-950/55 p-3 backdrop-blur-sm md:place-items-center">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-5 shadow-2xl"
        initial={{ opacity: 0, y: 24 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-leaf-700 text-white">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <span className="section-eyebrow">{localizedScheme.categoryLabel}</span>
              <h3 className="mt-3 text-3xl font-black text-ink">{localizedScheme.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{localizedScheme.benefit}</p>
            </div>
          </div>
          <button className="icon-button shrink-0" type="button" aria-label="Close scheme details" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-leaf-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-leaf-800">{t("Eligibility")}</p>
            <p className="mt-2 leading-7 text-slate-700">{localizedScheme.eligibility}</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-4">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-amber-700">{t("Deadline")}</p>
            <p className="mt-2 flex items-center gap-2 font-black text-slate-800">
              <CalendarDays className="h-5 w-5" />
              {localizedScheme.deadline}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-slate-200 p-4">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">{t("Documents needed")}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {localizedScheme.documents.map((document) => (
              <span className="flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700" key={document}>
                <ClipboardCheck className="h-4 w-4 text-leaf-700" />
                {document}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button className="primary-button" type="button" onClick={() => onApply(scheme)}>
            <Send className="h-5 w-5" />
            {applied ? t("Draft Ready") : t("Start Apply")}
          </button>
          <button className="secondary-button" type="button" onClick={() => onSave(scheme)}>
            <Star className="h-5 w-5" />
            {saved ? t("Scheme Saved") : t("Save Scheme")}
          </button>
          <button
            className="secondary-button"
            type="button"
            onClick={() => onNotify(`${localizedScheme.title}: ${t("Call Sevak")}`)}
          >
            <Mic2 className="h-5 w-5" />
            {t("Call Sevak")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function SchemeDirectory({ onNotify }: { onNotify: (message: string) => void }) {
  const language = useContext(LanguageContext);
  const t = useT();
  const [category, setCategory] = useState<SchemeCategory>("All");
  const [query, setQuery] = useState("");
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [savedSchemes, setSavedSchemes] = useState<string[]>([]);
  const [appliedSchemes, setAppliedSchemes] = useState<string[]>([]);

  const visibleSchemes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return governmentSchemes.filter((scheme) => {
      const categoryMatch = category === "All" || scheme.category === category;
      const queryMatch =
        normalized.length === 0 ||
        [
          scheme.title,
          scheme.category,
          scheme.audience,
          scheme.benefit,
          translate(language, scheme.title),
          translate(language, scheme.category),
          translate(language, scheme.audience),
          translate(language, scheme.benefit),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [category, language, query]);

  const applyScheme = (scheme: GovernmentScheme) => {
    setAppliedSchemes((current) =>
      current.includes(scheme.id) ? current : [...current, scheme.id],
    );
    onNotify(`${translate(language, scheme.title)}: ${t("Draft Ready")}`);
  };

  const saveScheme = (scheme: GovernmentScheme) => {
    setSavedSchemes((current) => {
      const exists = current.includes(scheme.id);
      onNotify(exists ? `${translate(language, scheme.title)} ${t("Saved")} हटाया गया।` : `${translate(language, scheme.title)} ${t("Saved")}।`);
      return exists ? current.filter((id) => id !== scheme.id) : [...current, scheme.id];
    });
  };

  return (
    <section className="section-band bg-white" id="schemes">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <SectionHeader
            eyebrow="Government schemes"
            title="One desk for farmers, students, women, housing, health, and certificates."
            text="Click a scheme to see eligibility, documents, deadlines, and a simulated application draft. This is the part that makes the portal feel operational."
          />
          <div className="rounded-lg border border-slate-200 dark:border-white/10 bg-paper p-4">
            <label className="flex min-h-12 items-center gap-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white px-4">
              <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              <input
                className="w-full bg-transparent text-sm font-bold text-ink outline-none"
                placeholder={t("Search PM-Kisan, scholarship, health card...")}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {schemeCategories.map((item) => (
                <button
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    category === item
                      ? "bg-ink text-white dark:bg-yellow-300 dark:text-black"
                      : "bg-white text-slate-700 hover:bg-leaf-50 hover:text-leaf-800 dark:bg-slate-800 dark:text-slate-200 dark:border-white/5"
                  }`}
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                >
                  {t(item)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleSchemes.map((scheme) => {
            const Icon = scheme.icon;
            const saved = savedSchemes.includes(scheme.id);
            const applied = appliedSchemes.includes(scheme.id);
            const localizedScheme = localizeScheme(scheme, language);
            return (
              <article className="scheme-card dark:border-white/10" key={scheme.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-leaf-700 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${
                    scheme.status === "Priority"
                      ? "bg-yellow-300 text-black"
                      : scheme.status === "Camp Soon"
                        ? "bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300"
                        : "bg-leaf-50 text-leaf-800"
                  }`}>
                    {localizedScheme.statusLabel}
                  </span>
                </div>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-leaf-700">{localizedScheme.categoryLabel}</p>
                <h3 className="mt-2 text-2xl font-black text-ink">{localizedScheme.title}</h3>
                <p className="mt-2 text-sm font-bold text-slate-500">{localizedScheme.audience}</p>
                <p className="mt-3 leading-7 text-slate-600">{localizedScheme.benefit}</p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <button className="mini-button col-span-1" type="button" onClick={() => setSelectedScheme(scheme)}>
                    {t("Details")}
                  </button>
                  <button className="mini-button col-span-1" type="button" onClick={() => applyScheme(scheme)}>
                    {applied ? t("Draft") : t("Apply")}
                  </button>
                  <button className="mini-button col-span-1" type="button" onClick={() => saveScheme(scheme)}>
                    {saved ? t("Saved") : t("Save")}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-lg border border-leaf-700/15 bg-leaf-50 p-4 text-sm font-bold text-leaf-900">
          {t("Showing")} {visibleSchemes.length} {t("schemes")}. {t("Saved")} {savedSchemes.length}. {t("Drafts")} {appliedSchemes.length}.
        </div>
      </div>

      <SchemeModal
        scheme={selectedScheme}
        saved={selectedScheme ? savedSchemes.includes(selectedScheme.id) : false}
        applied={selectedScheme ? appliedSchemes.includes(selectedScheme.id) : false}
        onClose={() => setSelectedScheme(null)}
        onApply={applyScheme}
        onSave={saveScheme}
        onNotify={onNotify}
      />
    </section>
  );
}

function SchoolAndPanchayat() {
  const t = useT();
  return (
    <section className="section-band bg-white dark:bg-[#060f0a]" id="school">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_1fr] lg:px-6">
        <div>
          <SectionHeader
            eyebrow="Education"
            title="School progress that parents can trust."
          />
          <div className="mt-8 grid gap-4">
            {[
              ["Attendance heatmap", "94% average attendance across primary and secondary classes."],
              ["Scholarship watch", "312 applications verified with missing-document alerts."],
              ["Smart classroom", "18 rooms live, 7 repairs scheduled, 4 teacher trainings planned."],
            ].map(([title, detail]) => (
              <article className="row-card dark:border-white/5" key={title}>
                <CheckCircle2 className="mt-1 h-6 w-6 text-leaf-700" />
                <div>
                  <h3 className="text-xl font-black text-ink">{t(title)}</h3>
                  <p className="mt-1 leading-7 text-slate-600">{t(detail)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="panchayat">
          <SectionHeader
            eyebrow="Panchayat"
            title="The office becomes a live service desk."
          />
          <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 dark:border-white/10 bg-slate-950 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span className="font-black">{t("Citizen Requests")}</span>
              <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-black">
                {t("Live")}
              </span>
            </div>
            {[
              ["Birth certificate", "2 hr avg response", "98%"],
              ["Streetlight repair", "17 open tickets", "84%"],
              ["Water pipeline", "Ward 8 priority", "71%"],
            ].map(([title, detail, progress]) => (
              <div className="border-b border-white/10 px-5 py-4 last:border-b-0" key={title}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-black">{t(title)}</p>
                    <p className="mt-1 text-sm text-white/62">{t(detail)}</p>
                  </div>
                  <span className="text-xl font-black text-yellow-200">{progress}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-yellow-300" style={{ width: progress }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function KrishiChaupal({ onNotify }: { onNotify: (message: string) => void }) {
  const t = useT();
  const [response, setResponse] = useState(
    "Your irrigation subsidy file is verified. Payment is expected in the next district release.",
  );
  const [listening, setListening] = useState(false);
  const prompts = [
    {
      text: "PM-Kisan status batao",
      answer: "PM-Kisan e-KYC is pending for 27 farmers. Camp desk opens Friday at 10 AM.",
    },
    {
      text: "Kal barish hogi kya?",
      answer: "Rain chance is 62% tomorrow. Avoid pesticide spray until the evening wind drops.",
    },
    {
      text: "Meri complaint ka number kya hai?",
      answer: "Your latest water pipeline complaint is SRP-2048 and is assigned to Ward 8 team.",
    },
  ];

  return (
    <section className="section-band bg-[#f4f1e8]" id="krishi">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
        <div>
          <SectionHeader
            eyebrow="Krishi"
            title="Farm intelligence that speaks like the village."
            text="Weather, soil, mandi, irrigation, livestock, and subsidy status are grouped around daily decisions instead of department names."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {contactTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <article className="rounded-lg border border-stone-300 bg-white p-5 shadow-sm" key={tile.label}>
                  <Icon className="h-7 w-7 text-leaf-700" />
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-stone-500">{t(tile.label)}</p>
                  <p className="mt-1 text-2xl font-black text-ink">{tile.value}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-stone-300 bg-white p-5 shadow-xl" id="chaupal">
          <div className="flex items-center justify-between">
            <div>
              <span className="section-eyebrow">{t("Digital Chaupal")}</span>
              <h3 className="mt-3 text-3xl font-black text-ink">{t("Voice-first help desk")}</h3>
            </div>
            <button
              className={`grid h-14 w-14 place-items-center rounded-full text-white shadow-lg shadow-leaf-700/30 ${
                listening ? "bg-red-600" : "bg-leaf-700"
              }`}
              type="button"
              aria-label="Start voice help"
              onClick={() => {
                setListening((current) => !current);
                setResponse(
                  listening
                    ? "Voice help paused. Tap the mic again to ask Digital Chaupal."
                    : "Listening... try one of the sample Hindi questions below.",
                );
                onNotify(listening ? t("Digital Chaupal paused.") : t("Digital Chaupal is listening."));
              }}
            >
              <Mic2 className={listening ? "h-7 w-7 animate-pulse" : "h-7 w-7"} />
            </button>
          </div>
          <div className="mt-6 space-y-3">
            {prompts.map((prompt) => (
              <button
                className="flex w-full items-center gap-3 rounded-lg bg-stone-100 px-4 py-3 text-left transition hover:bg-leaf-50 focus:outline-none focus:ring-4 focus:ring-leaf-700/20"
                key={prompt.text}
                type="button"
                onClick={() => {
                  setResponse(prompt.answer);
                  setListening(false);
                  onNotify(t("Digital Chaupal answered your voice prompt."));
                }}
              >
                <Volume2 className="h-5 w-5 text-leaf-700" />
                <span className="font-devanagari text-lg font-bold text-slate-800">{t(prompt.text)}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-ink p-4 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-200">{t("Response")}</p>
            <p className="mt-2 text-lg font-bold leading-7">{t(response)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineIdentity() {
  const t = useT();
  return (
    <section className="section-band bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader
            eyebrow="Digital identity"
            title="Certificates, records, and proof move at portal speed."
            text="Aadhaar-linked services, QR verification, property extracts, birth certificates, and online requests are designed as trackable citizen journeys."
          />
          <div className="grid gap-4 sm:grid-cols-4">
            {timeline.map((item) => {
              const Icon = item.icon;
              return (
                <article className="rounded-lg border border-white/10 bg-white/[0.08] p-4 backdrop-blur" key={item.title}>
                  <Icon className="h-7 w-7 text-yellow-200" />
                  <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-white/45">{item.year}</p>
                  <h3 className="mt-2 text-xl font-black">{t(item.title)}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function QRModal({
  open,
  onClose,
  onNotify,
}: {
  open: boolean;
  onClose: () => void;
  onNotify: (message: string) => void;
}) {
  const t = useT();
  if (!open) return null;
  const cells = Array.from({ length: 121 }, (_, index) => {
    const x = index % 11;
    const y = Math.floor(index / 11);
    const finder =
      (x < 4 && y < 4) ||
      (x > 6 && y < 4) ||
      (x < 4 && y > 6);
    const pattern = finder || (x * 7 + y * 5 + index) % 5 === 0 || (x + y * 2) % 7 === 0;
    return pattern;
  });

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="qr-card w-full max-w-sm rounded-lg bg-white p-5 text-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.96 }}
      >
        <div className="flex items-center justify-between text-left">
          <div>
            <span className="section-eyebrow">{t("Mobile QR")}</span>
            <h3 className="mt-3 text-2xl font-black text-ink">{t("Suryapura app link")}</h3>
          </div>
          <button className="icon-button" type="button" aria-label="Close QR modal" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="qr-matrix mx-auto mt-6 grid w-56 grid-cols-11 gap-1 rounded-lg border border-slate-200 bg-white p-3">
          {cells.map((filled, index) => (
            <span className={`aspect-square rounded-[2px] ${filled ? "bg-ink" : "bg-transparent"}`} key={index} />
          ))}
        </div>
        <p className="mt-5 leading-7 text-slate-600">
          {t("Demo QR for the village mobile portal. Copy opens the same local app URL.")}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              void navigator.clipboard?.writeText(window.location.href);
              onNotify(t("Portal link copied."));
            }}
          >
            {t("Copy Link")}
          </button>
          <button className="secondary-button" type="button" onClick={onClose}>
            {t("Done")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function MobilePreview({ onOpenQr }: { onOpenQr: () => void }) {
  const t = useT();
  return (
    <section className="section-band bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-6">
        <div>
          <SectionHeader
            eyebrow="Mobile first"
            title="The portal feels native even on a 320px phone."
            text="A sticky dock keeps the four most important village tasks one thumb away: Home, School, Krishi, and Chaupal."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="primary-button" href="#home">
              {t("Launch Portal")}
              <Play className="h-5 w-5" />
            </a>
            <button className="secondary-button" type="button" onClick={onOpenQr}>
              <QrCode className="h-5 w-5" />
              {t("App QR")}
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="rounded-[2rem] border-[10px] border-slate-950 bg-slate-950 p-2 shadow-2xl">
            <div className="overflow-hidden rounded-[1.35rem] bg-white">
              <div className="bg-leaf-900 px-4 py-4 text-white">
                <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-white/35" />
                <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-200">{t("Suryapura")}</p>
                <p className="mt-1 text-2xl font-black">{t("Kisan dashboard")}</p>
              </div>
              <div className="space-y-3 p-4">
                {kisanActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3" key={action.title}>
                      <div className={`grid h-12 w-12 place-items-center rounded-lg ${action.tone}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-black text-ink">{t(action.title)}</p>
                        <p className="text-sm font-bold text-slate-500">{t(action.value)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mx-4 mb-4 rounded-full border border-white/50 bg-white/80 p-2 shadow-dock backdrop-blur-xl">
                <div className="grid grid-cols-4 gap-1">
                  {dockItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div className="grid place-items-center gap-1 rounded-full px-2 py-2 text-[10px] font-black text-slate-600" key={item.label}>
                        <Icon className="h-4 w-4" />
                        {t(item.label)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomDock() {
  const t = useT();
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-3 md:hidden">
      <nav className="mx-auto grid max-w-md grid-cols-4 gap-1 rounded-full border border-white/50 bg-white/75 p-2 shadow-dock backdrop-blur-2xl">
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              className="grid place-items-center gap-1 rounded-full px-2 py-2 text-[11px] font-black text-slate-700 transition hover:bg-leaf-700 hover:text-white"
              href={`#${item.target}`}
              key={item.label}
            >
              <Icon className="h-5 w-5" />
              {t(item.label)}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

function FloatingChaupal() {
  return (
    <a
      className="fixed bottom-24 right-4 z-40 hidden h-16 w-16 place-items-center rounded-full bg-ink text-white shadow-2xl shadow-slate-950/30 transition hover:-translate-y-1 md:grid"
      href="#chaupal"
      aria-label="Open Digital Chaupal voice help"
    >
      <BellRing className="absolute h-16 w-16 animate-ping text-amber-rural opacity-20" />
      <Mic2 className="relative h-7 w-7" />
    </a>
  );
}

function Toast({ message }: { message: string | null }) {
  const t = useT();
  if (!message) return null;

  return (
    <div className="fixed left-1/2 top-24 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-lg border border-leaf-700/20 bg-white px-4 py-3 text-sm font-bold text-ink shadow-2xl">
      {t(message)}
    </div>
  );
}

function Footer() {
  const t = useT();
  return (
    <footer className="bg-ink px-4 pb-32 pt-14 text-white md:pb-28 lg:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl font-black">{t("Suryapura Gram Vikas Portal")}</p>
          <p className="mt-3 max-w-xl leading-7 text-white/62">
            {t("Built as a modern rural SaaS experience for governance, education, agriculture, identity, and community participation.")}
          </p>
        </div>
        <div className="grid gap-2 text-sm font-bold text-white/70 sm:grid-cols-3">
          <a href="#development">{t("Development")}</a>
          <a href="#schemes">{t("Schemes")}</a>
          <a href="#chaupal">{t("Chaupal")}</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("standard");
  const [language, setLanguage] = useState<Language>("hi");
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const rootClass = useMemo(
    () => [
      mode === "kisan" ? "kisan-mode" : "standard-mode",
      darkMode ? "dark-portal dark" : "light-portal",
    ].filter(Boolean).join(" "),
    [darkMode, mode],
  );

  useSmoothScroll();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    document.title = translate(language, "Suryapura Portal") + " | " + translate(language, "Gram Vikas");
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language === "hi" ? "hi" : "en";
  }, [language]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const notify = (message: string) => setToast(message);

  const handleKisanAction = (action: string) => {
    if (action === "Schemes") {
      document.querySelector("#schemes")?.scrollIntoView({ behavior: "smooth" });
      notify(language === "hi" ? "15 सरकारी योजनाओं की सूची खुल गई।" : "Scheme desk opened with 15 active government schemes.");
      return;
    }

    if (action === "Weather") {
      notify(language === "hi" ? "मौसम सलाह: बारिश 62%, शाम तक छिड़काव न करें।" : "Weather advisory opened: rain 62%, avoid spraying until evening.");
      document.querySelector("#krishi")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    notify(language === "hi" ? "फसल भाव: गेहूं 2,420 रुपये, मंडी भाव बढ़ रहा है।" : "Crop price alert: wheat is Rs. 2,420 and mandi trend is rising.");
    document.querySelector("#krishi")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LanguageContext.Provider value={language}>
      <div className={rootClass}>
        <MobileModeBar mode={mode} setMode={setMode} />
        <Navbar
          mode={mode}
          setMode={setMode}
          language={language}
          darkMode={darkMode}
          onLanguageToggle={() => {
            setLanguage((current) => {
              const next = current === "en" ? "hi" : "en";
              notify(next === "hi" ? "पूरा पोर्टल हिंदी में हो गया।" : "Portal switched to English.");
              return next;
            });
          }}
          onDarkModeToggle={() => {
            setDarkMode((current) => {
              notify(current ? (language === "hi" ? "लाइट मोड चालू।" : "Light mode enabled.") : (language === "hi" ? "डार्क मोड चालू।" : "Dark mode enabled."));
              return !current;
            });
          }}
        />
        <main>
          <Hero mode={mode} />
          <Metrics mode={mode} />
          <Development mode={mode} />
          <KisanModePanel mode={mode} onAction={handleKisanAction} />
          <SchemeDirectory onNotify={notify} />
          <SchoolAndPanchayat />
          <KrishiChaupal onNotify={notify} />
          <TimelineIdentity />
          <MobilePreview onOpenQr={() => setQrOpen(true)} />
        </main>
        <Footer />
        <FloatingChaupal />
        <BottomDock />
        <QRModal open={qrOpen} onClose={() => setQrOpen(false)} onNotify={notify} />
        <Toast message={toast} />
      </div>
    </LanguageContext.Provider>
  );
}

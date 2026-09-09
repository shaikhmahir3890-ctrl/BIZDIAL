"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "es" | "fr";

type Translations = {
  [key: string]: string;
};

const dictionaries: Record<Language, Translations> = {
  en: {
    heroTitle: "Find Local Businesses & Services",
    heroSubtitle: "Discover the best restaurants, hospitals, and services near you.",
    popularCategories: "Popular Categories",
    featuredBusinesses: "Featured Businesses",
    openNow: "Open Now",
    closed: "Closed",
    reviews: "Reviews",
    cityPlaceholder: "City, Neighborhood...",
    searchPlaceholder: "Restaurants, Plumbers, Hotels...",
    searchBtn: "Search",
    logIn: "Log In",
    signUp: "Sign Up",
    foundBusinesses: "Found {0} businesses",
    filters: "Filters",
    sortBy: "Sort By",
    relevancy: "Relevancy",
    highestRated: "Highest Rated",
    mostReviewed: "Most Reviewed",
    status: "Status",
    contact: "Contact",
    viewProfile: "View Profile",
    noBusinessesFound: "No businesses found",
    tryAdjusting: "Try adjusting your search terms or location.",
    goBackHome: "Go Back Home",
    aboutBusiness: "About this business",
    writeReview: "Write a Review",
    noReviewsYet: "No reviews yet.",
    contactInfo: "Contact Info",
    callNow: "Call Now",
    getDirections: "Get Directions"
  },
  es: {
    heroTitle: "Encuentra Empresas y Servicios Locales",
    heroSubtitle: "Descubre los mejores restaurantes, hospitales y servicios cerca de ti.",
    popularCategories: "Categorías Populares",
    featuredBusinesses: "Empresas Destacadas",
    openNow: "Abierto Ahora",
    closed: "Cerrado",
    reviews: "Reseñas",
    cityPlaceholder: "Ciudad, Barrio...",
    searchPlaceholder: "Restaurantes, Plomeros, Hoteles...",
    searchBtn: "Buscar",
    logIn: "Iniciar Sesión",
    signUp: "Registrarse",
    foundBusinesses: "Se encontraron {0} empresas",
    filters: "Filtros",
    sortBy: "Ordenar Por",
    relevancy: "Relevancia",
    highestRated: "Mejor Calificado",
    mostReviewed: "Más Reseñado",
    status: "Estado",
    contact: "Contacto",
    viewProfile: "Ver Perfil",
    noBusinessesFound: "No se encontraron empresas",
    tryAdjusting: "Intenta ajustar tus términos de búsqueda o ubicación.",
    goBackHome: "Volver al Inicio",
    aboutBusiness: "Acerca de esta empresa",
    writeReview: "Escribir una Reseña",
    noReviewsYet: "Sin reseñas aún.",
    contactInfo: "Información de Contacto",
    callNow: "Llamar Ahora",
    getDirections: "Obtener Direcciones"
  },
  fr: {
    heroTitle: "Trouvez des Entreprises et Services Locaux",
    heroSubtitle: "Découvrez les meilleurs restaurants, hôpitaux et services près de chez vous.",
    popularCategories: "Catégories Populaires",
    featuredBusinesses: "Entreprises en Vedette",
    openNow: "Ouvert Maintenant",
    closed: "Fermé",
    reviews: "Avis",
    cityPlaceholder: "Ville, Quartier...",
    searchPlaceholder: "Restaurants, Plombiers, Hôtels...",
    searchBtn: "Rechercher",
    logIn: "Connexion",
    signUp: "S'inscrire",
    foundBusinesses: "Trouvé {0} entreprises",
    filters: "Filtres",
    sortBy: "Trier Par",
    relevancy: "Pertinence",
    highestRated: "Le Mieux Noté",
    mostReviewed: "Le Plus Commenté",
    status: "Statut",
    contact: "Contact",
    viewProfile: "Voir le Profil",
    noBusinessesFound: "Aucune entreprise trouvée",
    tryAdjusting: "Essayez d'ajuster vos termes de recherche ou votre emplacement.",
    goBackHome: "Retour à l'Accueil",
    aboutBusiness: "À propos de cette entreprise",
    writeReview: "Rédiger un Avis",
    noReviewsYet: "Pas encore d'avis.",
    contactInfo: "Coordonnées",
    callNow: "Appeler Maintenant",
    getDirections: "Obtenir l'Itinéraire"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, ...args: (string | number)[]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string, ...args: (string | number)[]) => {
    let text = dictionaries[language][key] || key;
    args.forEach((arg, index) => {
      text = text.replace(`{${index}}`, String(arg));
    });
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

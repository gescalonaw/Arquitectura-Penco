// Datos centralizados de los barrios industriales de Penco

// ✅ Imports de imágenes — Vite las procesa y optimiza automáticamente
import imgCRAV from '../assets/CRAV02.png'
import imgVIPLA from '../assets/VIPLA2.png'
import imgFanaloza from '../assets/FONDO-FANALOZA.png'

export const barrios = [
  {
    slug: 'crav',
    nombre: 'CRAV',
    nombreCompleto: 'Compañía Refinería de Azúcar',
    descripcion: 'Conjunto industrial y habitacional ligado a la refinería de azúcar, con tres recintos asociados.',
    imagen: imgCRAV,
    recintos: [
      { id: 'recinto-crav', nombre: 'Recinto CRAV' },
      { id: 'desiderio-guzman', nombre: 'P. Desiderio Guzmán' },
      { id: 'los-radales', nombre: 'Villa Los Radales' },
    ],
  },
  {
    slug: 'vipla',
    nombre: 'VIPLA',
    nombreCompleto: 'Fábrica Nacional de Vidrios Planos',
    descripcion: 'Antigua fábrica Nacional de Vidrios Planos y su barrio obrero asociado.',
    imagen: imgVIPLA,
    recintos: [
    
    ],
  },
  {
    slug: 'fanaloza',
    nombre: 'FANALOZA',
    nombreCompleto: 'Fábrica Nacional de Loza',
    descripcion: 'Complejo de cerámica con dos poblaciones obreras asociadas.',
    imagen: imgFanaloza,
    recintos: [
      { id: 'juan-diaz', nombre: 'Población Juan Díaz' },
      { id: 'facundo-diaz', nombre: 'Población Facundo Díaz' },
    ],
  },
]

export const navegacion = {
  proyecto: [
    { label: 'Sobre el proyecto', to: '/proyecto' },
    { label: 'Equipo', to: '/proyecto#equipo' },
  ],
  barrios: [
    { label: 'CRAV', to: '/barrios/crav' },
    { label: 'VIPLA', to: '/barrios/vipla' },
    { label: 'FANALOZA', to: '/barrios/fanaloza' },
  ],
  multimedia: [
    { label: 'Libro · Publicaciones', to: '/publicaciones' },
    { label: 'Videos', to: '/videos' },
    { label: 'Maquetas', to: '/maquetas-3d' },
    { label: 'Mapa interactivo', to: '/mapa' },
  ],
}
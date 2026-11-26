/**
 * Normaliza un valor para compararlo en los buscadores:
 * minúsculas, sin tildes y sin espacios sobrantes.
 */
export function normalizar(valor: string | number | null | undefined): string {
  if (valor === null || valor === undefined) {
    return '';
  }

  return String(valor)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/** Devuelve true si alguno de los campos contiene el texto buscado. */
export function coincide(textoBuscado: string, campos: Array<string | number | null | undefined>): boolean {
  const busqueda = normalizar(textoBuscado);

  if (!busqueda) {
    return true;
  }

  return campos.some((campo) => normalizar(campo).includes(busqueda));
}

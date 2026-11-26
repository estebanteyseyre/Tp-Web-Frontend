import { coincide, normalizar } from './busqueda';

describe('busqueda', () => {
  it('normaliza minúsculas, tildes y espacios', () => {
    expect(normalizar('  Mónaco  ')).toBe('monaco');
    expect(normalizar(17)).toBe('17');
    expect(normalizar(null)).toBe('');
  });

  it('coincide con cualquier campo y con búsqueda vacía', () => {
    expect(coincide('monaco', ['Gran Premio de Mónaco', 2026])).toBe(true);
    expect(coincide('ferrari', ['Gran Premio de Mónaco', 2026])).toBe(false);
    expect(coincide('', ['Gran Premio de Mónaco'])).toBe(true);
  });
});

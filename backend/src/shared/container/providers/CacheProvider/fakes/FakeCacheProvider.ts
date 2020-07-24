import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cacheRepository: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.cacheRepository[key] = JSON.stringify(value);
  }
  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cacheRepository[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cacheRepository[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cacheRepository).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cacheRepository[key];
    });
  }
}

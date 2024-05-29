// Singleton to store the connection function
export default class ConnectionService {
  private static instance: ConnectionService;
  private connectionFn: (() => Promise<SubiConnectAccessToken>) | null = null;

  private constructor() {}

  public static getInstance(): ConnectionService {
    if (!ConnectionService.instance) {
      ConnectionService.instance = new ConnectionService();
    }
    return ConnectionService.instance;
  }

  setConnectionFn(fn: () => Promise<SubiConnectAccessToken>): void {
    this.connectionFn = fn;
  }

  getConnectionFn(): (() => Promise<SubiConnectAccessToken>) | null {
    return this.connectionFn;
  }
}

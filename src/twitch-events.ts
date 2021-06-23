export class TwitchEvents {
  /**
   * Client functions for Twitch events that are raised. These can be overridden/assigned to your own functions.
   */
  constructor() {}

  public onFollow = async () => {
    try {
      console.warn(`'onFollow' method not implemented.`);
    } catch (error) {
      throw error;
    }
  };
  // TODO: add default functions for other Twitch events (such as onSubscribe)
}

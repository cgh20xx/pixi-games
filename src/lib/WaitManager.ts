class WaitProxy {
  constructor(
    /**
     * 結束時間 (單位為 frame)
     */
    public endTime: number,
    public resolve: () => void,
    public reject: (error: string) => void
  ) {}

  cancel() {
    this.reject('Wait canceled');
  }
}

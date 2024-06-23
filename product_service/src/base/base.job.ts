import BaseClass from "./base.class";
import { CronJob } from "cron";
import LogHelper from "@/helpers/log.helper";

export default class BaseJob extends BaseClass {
  protected job: CronJob;

  constructor(
    protected name: string,
    protected time: string,
    protected start = true,
    protected timezone = process.env.TIMEZONE_DEFAULT,
  ) {
    super();
    this.name = name;
    this.time = time;
    this.timezone = timezone;
    this.start = start;
  }

  onTick() {
    LogHelper.logInfo(this.name, "is running");
  }

  onComplete() {
    LogHelper.logInfo(this.name, "is complete");
  }

  startJob() {
    try {
      this.job = new CronJob(
        this.time,
        this.onTick,
        this.onComplete,
        this.start,
        this.timezone,
      );
      this.job.start();
    } catch (err) {
      LogHelper.logError(this.name, err as string);
    }
  }

  stop() {
    try {
      this.job.stop();
    } catch (err) {
      LogHelper.logError(this.name, err as string);
    }
  }
}

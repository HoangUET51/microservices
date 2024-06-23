import { LIMIT_PER_PAGE } from "@/constants/common.const";
import { Pagination } from "@/models";
import { FindManyOptions, Repository } from "typeorm";
import BaseEntity from "./base.entity";
import { TypeOrmPaginator } from "./base.type";

abstract class BaseRepository<E extends BaseEntity> extends Repository<E> {
  async findById(id: string | number): Promise<E | undefined> {
    const record = await this.findOne(id);
    return record;
  }

  async insertOrUpdate(table: string, entity: E): Promise<E | null> {
    try {
      if (entity.id && entity.id > 0) {
        return await this.manager.save(entity, { reload: false });
      }
      const res = await this.manager
        .createQueryBuilder()
        .insert()
        .into(table)
        .values(entity)
        .updateEntity(false)
        .execute();
      entity.id = res.raw.insertId;
      return entity;
    } catch (error) {
      return null;
    }
  }

  async bulkInsert(table: string, entities: E[]): Promise<E[] | null> {
    try {
      const res = await this.manager
        .createQueryBuilder()
        .insert()
        .into(table)
        .values(entities)
        .updateEntity(false)
        .execute();
      let newId = Number(res.raw?.insertId);
      return entities.map((item) => {
        item.id = newId;
        newId++;
        return item;
      });
    } catch (error) {
      return null;
    }
  }

  async paginate(
    page = 1,
    limit = LIMIT_PER_PAGE,
    options?: FindManyOptions<E>,
  ): Promise<TypeOrmPaginator<E>> {
    const skip = (page - 1) * limit;
    const [records, count] = await this.findAndCount({
      skip,
      take: limit,
      ...options,
    });
    const lastPage = count < limit ? 1 : Math.ceil(count / limit);

    return {
      data: records,
      page,
      limit,
      lastPage,
      total: count,
    };
  }

  basicGeneratePagination(page: any, limit: any, count: any): Pagination {
    const lastPage = count < limit ? 1 : Math.ceil(count / limit);
    return {
      page,
      limit,
      lastPage,
      total: count,
    };
  }
}

export default BaseRepository;

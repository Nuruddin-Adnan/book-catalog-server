"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryFilters = (query, req) => {
    let filters = Object.assign({}, query);
    const queries = {};
    // sort, page, limit -> exclude
    const excludeFields = [
        'sort',
        'page',
        'limit',
        'fields',
        'searchFields',
    ];
    excludeFields.forEach((field) => delete filters[field]);
    // gt, gte, lt, lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    filters = JSON.parse(filtersString);
    // Fields that want to show or hide
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queries.fields = fields;
    }
    // Fields that need to be search
    if (req.query.searchFields) {
        const searchFields = req.query.searchFields
            .split(',')
            .join(' ');
        queries.searchFields = searchFields;
    }
    if (req.query.sort) {
        const sort = req.query.sort.split(',').join(' ');
        queries.sort = sort;
    }
    if (req.query.page || req.query.limit) {
        const { page = '1', limit = '10' } = req.query;
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        queries.skip = skip;
        queries.limit = parseInt(limit, 10);
    }
    return {
        filters,
        queries,
    };
};
exports.default = queryFilters;

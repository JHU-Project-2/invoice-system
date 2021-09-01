SELECT
    `company`.`id`,
    `company`.`name`,
    `address`.`id` AS `address.id`,
    `address`.`address_1` AS `address.address_1`,
    `address`.`address_2` AS `address.address_2`,
    `address`.`city` AS `address.city`,
    `address`.`state` AS `address.state`
FROM
    `company` AS `company`
    LEFT OUTER JOIN `address` AS `address` ON `company`.`id` = `address`.`address_id`
WHERE
    `company`.`id` = '1';
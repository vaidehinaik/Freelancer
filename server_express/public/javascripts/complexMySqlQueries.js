exports.get_all_projects_query_string = () => {
                   return "SELECT projects.projectId, MAX(projects.title) as title," +
                   "MAX(projects.description) as description, MAX(projects.budgetLow) as budgetLow," +
                   "MAX(projects.budgetHigh) as budgetHigh, MAX(projects.skills) as skills," +
                   "MAX(projects.status) as status, MAX(users.username) AS employer," +
                   "COUNT(projectbid.projectId) AS bidsCount," +
                   "(CASE WHEN AVG(projectbid.bidAmount) IS NULL THEN 0 ELSE AVG(projectbid.bidAmount) END) " +
                   "AS averageBidAmount FROM projects LEFT OUTER JOIN projectbid "  +
                   "ON projects.projectId = projectbid.projectId " +
                   "INNER JOIN users ON projects.ownerUserId =  users.userId WHERE projects.status = 0 " +
                   "GROUP BY projects.projectId";
              }

exports.get_user_projects_query_string = (username) => {
                    return "SELECT projects.projectId, MAX(projects.title) as title," +
                           "MAX(projects.description) as description, MAX(projects.budgetLow) as budgetLow," +
                           "MAX(projects.budgetHigh) as budgetHigh, MAX(projects.skills) as skills," +
                           "MAX(users.username) AS employer, COUNT(projectbid.projectId) AS bidsCount," +
                           "(CASE WHEN AVG(projectbid.bidAmount) IS NULL THEN 0 ELSE AVG(projectbid.bidamount) END) " +
                           "AS averageBidAmount FROM projects LEFT OUTER JOIN projectbid ON " +
                           "projects.projectId = projectbid.projectId INNER JOIN users ON projects.ownerUserId =  users.userId " +
                           "WHERE projects.status = 0 AND projects.owneruserid = (" +
                           "select userId from users where username = '" + username + "') " +
                           "GROUP BY projects.projectId";
            }
exports.get_user_bid_projects_query_string = (username) => {
                     return "SELECT A.projectId, A.title, A.employer, A.averageBidAmount, A.budgetLow, A.budgetHigh," +
                            "A.status, projectbid.bidAmount, projectbid.periodInDays FROM projectbid INNER JOIN (" +
                             "SELECT projects.projectId," +
                             "MAX(projects.title) as title," +
                             "MAX(projects.description) as description," +
                             "MAX(projects.budgetLow) as budgetLow," +
                             "MAX(projects.budgetHigh) as budgetHigh," +
                            "MAX(projects.skills) as skills," +
                             "MAX(users.username) AS employer," +
                             "COUNT(projectbid.projectId) AS bidsCount," +
                             "AVG(projectbid.bidAmount) AS averageBidAmount," +
                             "MAX(projects.status) as Status " +
                             "FROM projects INNER JOIN projectbid ON projects.projectId = projectbid.projectId " +
                             "INNER JOIN users ON projects.ownerUserId =  users.userId " +
                             "WHERE projects.status = 0 " +
                             "GROUP BY projects.projectId) AS A ON projectbid.projectId = A.projectId " +
                             "WHERE projectbid.userId = (select userId from users where username ='" + username + "')";
         }

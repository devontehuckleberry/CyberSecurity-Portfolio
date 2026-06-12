import type { Metadata } from 'next'
import styles from '../project-page.module.css'

export const metadata: Metadata = {
  title: 'SQL Filters & Joins — Security Investigation Queries — Devonte Huckleberry',
  description:
    'SQL filters and joins for security investigations — AND, OR, NOT, and LIKE queries against login and employee records in MariaDB. Work sample by Devonte Huckleberry.',
}

const queries = [
  {
    num: 'QUERY 01',
    title: 'Failed logins after 18:00',
    op: 'AND',
    desc: 'Both conditions had to be true at the same time — the attempt happened after hours and it failed — so AND was the right operator. It returns only the rows matching every specified condition, isolating exactly the suspicious activity.',
    sql: `SELECT * FROM log_in_attempts\nWHERE login_time > '18:00:00' AND success = 0;`,
  },
  {
    num: 'QUERY 02',
    title: 'Activity on two investigation dates',
    op: 'OR',
    desc: "The suspicious event could have occurred on either of two dates under investigation, so OR was necessary — it returns rows matching either condition rather than requiring both.",
    sql: `SELECT * FROM log_in_attempts\nWHERE login_date = '2022-05-08' OR login_date = '2022-05-09';`,
  },
  {
    num: 'QUERY 03',
    title: 'Exclude one country by pattern',
    op: "NOT + LIKE",
    desc: "The pattern 'MEX%' catches both 'MEX' and 'MEXICO' as they appear in the dataset, and NOT reverses the match to return every other country.",
    sql: `SELECT * FROM log_in_attempts\nWHERE NOT country LIKE 'MEX%';`,
  },
  {
    num: 'QUERY 04',
    title: 'Department + location subset',
    op: 'AND + LIKE',
    desc: 'Combining both conditions targeted only the specific subset of employees whose machines needed the update — Marketing staff located in the East building.',
    sql: `SELECT * FROM employees\nWHERE department = 'Marketing' AND office LIKE 'East%';`,
  },
  {
    num: 'QUERY 05',
    title: 'Two departments, one update',
    op: 'OR',
    desc: "Finance and Sales needed a different security update from the rest of the company, so OR pulled both groups in a single query instead of running two separate commands.",
    sql: `SELECT * FROM employees\nWHERE department = 'Finance' OR department = 'Sales';`,
  },
  {
    num: 'QUERY 06',
    title: 'Everyone outside one department',
    op: 'NOT',
    desc: "The update only affected non-IT staff, so NOT department = 'Information Technology' returned the full list of employees who still needed it applied.",
    sql: `SELECT * FROM employees\nWHERE NOT department = 'Information Technology';`,
  },
]

const headings = [
  'After-hours failed login attempts',
  'Login attempts on specific dates',
  'Login attempts outside of Mexico',
  'Employees in Marketing (East building)',
  'Employees in Finance or Sales',
  'All employees not in IT',
]

export default function SqlInvestigationPage() {
  return (
    <>
      <div className={styles.tag}>Case File 03 · Work Sample</div>
      <h1 className={styles.title}>SQL Filters &amp; Joins — Security Investigation Queries</h1>

      <div className={styles.chips} style={{ marginBottom: '2rem', marginTop: 0 }}>
        {['SQL', 'MariaDB', 'Linux', 'Log Querying', 'AND / OR / NOT / LIKE'].map((t) => (
          <span key={t} className={styles.chip}>{t}</span>
        ))}
      </div>

      <div className={styles.callout}>
        <strong>Scenario.</strong> A work sample from the Google Cybersecurity Professional Certificate. The
        security team needs data to investigate potential issues and to push a system update. The task: pull
        specific records about employees, their machines, and their departments from a MariaDB database —
        translating each investigation need into precise filter logic.
      </div>

      {queries.map((q, i) => (
        <div key={q.num}>
          <h2 className={styles.section}>{headings[i]}</h2>
          <div className={styles.queryCard}>
            <div className={styles.queryHead}>
              <span className={styles.queryNum}>{q.num}</span>
              <span className={styles.queryTitle}>{q.title}</span>
              <span className={styles.queryOp}>{q.op}</span>
            </div>
            <div className={styles.queryBody}>
              <p>{q.desc}</p>
              <pre>{q.sql}</pre>
            </div>
          </div>
        </div>
      ))}

      <h2 className={styles.section}>Summary</h2>
      <p>
        This project used SQL filters in MariaDB to retrieve targeted data from login and employee records in
        support of a security investigation and a system-update effort. I applied <code>AND</code>,{' '}
        <code>OR</code>, and <code>NOT</code> — along with <code>LIKE</code> for pattern matching — to
        isolate specific records across six scenarios. Each query meant translating an investigation need into
        precise filter logic, which reinforced how operator choice directly shapes what data comes back.
      </p>
      <p>
        The bigger takeaway: SQL is a practical, everyday tool for security analysts, not just database
        administrators. Querying for failed logins, suspicious date ranges, geographic anomalies, and
        department-specific records maps directly onto real SOC and incident-response work.
      </p>
    </>
  )
}

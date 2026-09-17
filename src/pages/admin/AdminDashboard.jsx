import { useTranslation } from "react-i18next";

import {
  Users,
  UserCheck,
  BriefcaseBusiness,
  Building2,
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* =========================================================
   JOBCONNECT COLORS
========================================================= */

const CHART_COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#4F46E5",
];

/* =========================================================
   STATIC DATA
   Pour screenshot / présentation
========================================================= */

const STATIC_STATS = {
  users: 24,
  candidates: 14,
  recruiters: 7,
  admins: 3,

  companies: 12,
  jobs: 18,
  applications: 42,

  pending_applications: 15,
  accepted_applications: 10,
  rejected_applications: 8,

  reviewing_applications: 6,
  interview_applications: 3,
};

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ title, value, icon: Icon }) {
  return (
    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p
            className="
              text-sm
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            {title}
          </p>

          <p
            className="
              mt-2
              text-3xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {value}
          </p>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-indigo-100
            text-indigo-600
            dark:bg-indigo-500/10
            dark:text-indigo-400
          "
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CHART CARD
========================================================= */

function ChartCard({
  title,
  description,
  children,
}) {
  return (
    <section
      className="
        w-full
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
        sm:p-6
      "
    >
      <div className="mb-5">
        <h3
          className="
            text-lg
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          {title}
        </h3>

        {description && (
          <p
            className="
              mt-1
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            {description}
          </p>
        )}
      </div>

      <div className="h-[300px] w-full sm:h-[340px]">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   CUSTOM TOOLTIP
========================================================= */

function CustomTooltip({
  active,
  payload,
  label,
}) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div
      className="
        rounded-xl
        border border-slate-200
        bg-white
        px-4
        py-3
        shadow-lg
        dark:border-slate-700
        dark:bg-slate-800
      "
    >
      {label && (
        <p
          className="
            mb-1
            text-sm
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {label}
        </p>
      )}

      {payload.map((item, index) => (
        <p
          key={`${item.dataKey}-${index}`}
          className="
            text-sm
            text-slate-600
            dark:text-slate-300
          "
        >
          {item.name}:{" "}
          <span
            className="
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {item.value}
          </span>
        </p>
      ))}
    </div>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function AdminDashboard() {
  const { t } = useTranslation();

  /* =======================================================
     STATIC STATISTICS
  ======================================================= */

  const stats = STATIC_STATS;

  const users = stats.users;
  const candidates = stats.candidates;
  const recruiters = stats.recruiters;
  const admins = stats.admins;

  const companies = stats.companies;
  const jobs = stats.jobs;
  const applications = stats.applications;

  const pendingApplications =
    stats.pending_applications;

  const acceptedApplications =
    stats.accepted_applications;

  const rejectedApplications =
    stats.rejected_applications;

  const reviewingApplications =
    stats.reviewing_applications;

  const interviewApplications =
    stats.interview_applications;

  /* =======================================================
     USERS CHART
  ======================================================= */

  const usersChartData = [
    {
      name: t(
        "adminDashboard.stats.candidates",
        "Candidats"
      ),
      value: candidates,
    },
    {
      name: t(
        "adminDashboard.stats.recruiters",
        "Recruteurs"
      ),
      value: recruiters,
    },
    {
      name: t(
        "adminDashboard.stats.admins",
        "Administrateurs"
      ),
      value: admins,
    },
  ];

  /* =======================================================
     PLATFORM CHART
  ======================================================= */

  const platformChartData = [
    {
      name: t(
        "adminDashboard.stats.companies",
        "Entreprises"
      ),
      value: companies,
    },
    {
      name: t(
        "adminDashboard.stats.jobs",
        "Offres d'emploi"
      ),
      value: jobs,
    },
    {
      name: t(
        "adminDashboard.stats.applications",
        "Candidatures"
      ),
      value: applications,
    },
  ];

  /* =======================================================
     APPLICATION CHART
  ======================================================= */

  const applicationsChartData = [
    {
      name: t(
        "adminDashboard.applicationStatus.pending",
        "En attente"
      ),
      value: pendingApplications,
    },
    {
      name: t(
        "adminDashboard.applicationStatus.reviewing",
        "En cours d'étude"
      ),
      value: reviewingApplications,
    },
    {
      name: t(
        "adminDashboard.applicationStatus.interview",
        "Entretien"
      ),
      value: interviewApplications,
    },
    {
      name: t(
        "adminDashboard.applicationStatus.accepted",
        "Acceptées"
      ),
      value: acceptedApplications,
    },
    {
      name: t(
        "adminDashboard.applicationStatus.rejected",
        "Refusées"
      ),
      value: rejectedApplications,
    },
  ];

  /* =======================================================
     DASHBOARD
  ======================================================= */

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-7xl
        px-4
        py-8
        sm:px-6
        lg:px-8
      "
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          mb-8
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
              sm:text-3xl
            "
          >
            {t(
              "adminDashboard.title",
              "Dashboard administrateur"
            )}
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-600
              dark:text-slate-400
              sm:text-base
            "
          >
            {t(
              "adminDashboard.subtitle",
              "Vue globale de l'activité de JobConnect."
            )}
          </p>
        </div>
      </div>

      {/* ===================================================
          USERS
      =================================================== */}

      <div className="mb-4">
        <h2
          className="
            text-lg
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {t(
            "adminDashboard.sections.users",
            "Utilisateurs"
          )}
        </h2>
      </div>

      {/* USER CARDS */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <StatCard
          title={t(
            "adminDashboard.stats.users",
            "Utilisateurs"
          )}
          value={users}
          icon={Users}
        />

        <StatCard
          title={t(
            "adminDashboard.stats.candidates",
            "Candidats"
          )}
          value={candidates}
          icon={UserCheck}
        />

        <StatCard
          title={t(
            "adminDashboard.stats.recruiters",
            "Recruteurs"
          )}
          value={recruiters}
          icon={Users}
        />

        <StatCard
          title={t(
            "adminDashboard.stats.admins",
            "Administrateurs"
          )}
          value={admins}
          icon={Users}
        />
      </div>

      {/* ===================================================
          FIRST ROW — 2 CHARTS
      =================================================== */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        "
      >
        {/* =================================================
            USERS DONUT
        ================================================= */}

        <ChartCard
          title={t(
            "adminDashboard.charts.usersTitle",
            "Répartition des utilisateurs"
          )}
          description={t(
            "adminDashboard.charts.usersDescription",
            "Répartition des comptes selon leur rôle."
          )}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={usersChartData}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
              >
                {usersChartData.map(
                  (_, index) => (
                    <Cell
                      key={`user-cell-${index}`}
                      fill={
                        CHART_COLORS[
                          index %
                            CHART_COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip
                content={<CustomTooltip />}
              />

              <Legend
                verticalAlign="bottom"
                height={36}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* =================================================
            PLATFORM OVERVIEW
        ================================================= */}

        <ChartCard
          title={t(
            "adminDashboard.charts.platformTitle",
            "Vue globale de la plateforme"
          )}
          description={t(
            "adminDashboard.charts.platformDescription",
            "Comparaison des principaux indicateurs."
          )}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={platformChartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
              barCategoryGap="25%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="
                  stroke-slate-200
                  dark:stroke-slate-700
                "
              />

              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
                className="
                  fill-slate-500
                  dark:fill-slate-400
                "
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
                className="
                  fill-slate-500
                  dark:fill-slate-400
                "
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="value"
                name={t(
                  "adminDashboard.charts.count",
                  "Nombre"
                )}
                fill="#6366F1"
                radius={[
                  10,
                  10,
                  0,
                  0,
                ]}
                maxBarSize={70}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ===================================================
          PLATFORM STATISTICS
      =================================================== */}

      <div className="mb-4 mt-10">
        <h2
          className="
            text-lg
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {t(
            "adminDashboard.sections.platform",
            "Activité de la plateforme"
          )}
        </h2>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        <StatCard
          title={t(
            "adminDashboard.stats.companies",
            "Entreprises"
          )}
          value={companies}
          icon={Building2}
        />

        <StatCard
          title={t(
            "adminDashboard.stats.jobs",
            "Offres d'emploi"
          )}
          value={jobs}
          icon={BriefcaseBusiness}
        />

        <StatCard
          title={t(
            "adminDashboard.stats.applications",
            "Candidatures"
          )}
          value={applications}
          icon={FileText}
        />
      </div>

      {/* ===================================================
          APPLICATION STATUS
      =================================================== */}

      <div className="mb-4 mt-10">
        <h2
          className="
            text-lg
            font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {t(
            "adminDashboard.sections.applications",
            "État des candidatures"
          )}
        </h2>
      </div>

      {/* APPLICATION CARDS */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-3
        "
      >
        <StatCard
          title={t(
            "adminDashboard.applicationStatus.pending",
            "En attente"
          )}
          value={pendingApplications}
          icon={Clock3}
        />

        <StatCard
          title={t(
            "adminDashboard.applicationStatus.accepted",
            "Acceptées"
          )}
          value={acceptedApplications}
          icon={CheckCircle2}
        />

        <StatCard
          title={t(
            "adminDashboard.applicationStatus.rejected",
            "Refusées"
          )}
          value={rejectedApplications}
          icon={XCircle}
        />
      </div>

      {/* ===================================================
          APPLICATION CHART — FULL WIDTH
      =================================================== */}

      <div className="mt-6 w-full">
        <ChartCard
          title={t(
            "adminDashboard.charts.applicationsTitle",
            "État des candidatures"
          )}
          description={t(
            "adminDashboard.charts.applicationsDescription",
            "Répartition des candidatures selon leur statut."
          )}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={applicationsChartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
              barCategoryGap="18%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="
                  stroke-slate-200
                  dark:stroke-slate-700
                "
              />

              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
                className="
                  fill-slate-500
                  dark:fill-slate-400
                "
              />

              <YAxis
                allowDecimals={false}
                tick={{
                  fontSize: 13,
                }}
                tickLine={false}
                axisLine={false}
                className="
                  fill-slate-500
                  dark:fill-slate-400
                "
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Bar
                dataKey="value"
                name={t(
                  "adminDashboard.charts.count",
                  "Nombre"
                )}
                fill="#8B5CF6"
                radius={[
                  10,
                  10,
                  0,
                  0,
                ]}
                maxBarSize={75}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

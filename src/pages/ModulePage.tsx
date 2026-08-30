import { Add, EditOutlined, Refresh } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { api, ApiError } from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { PageHeader } from "../components/PageHeader";
type Field = {
  key: string;
  label: string;
  type?: "number" | "select" | "url";
  options?: string[];
  required?: boolean;
};
interface Config {
  title: string;
  eyebrow: string;
  detail: string;
  endpoint: string;
  columns: Array<[string, string]>;
  fields?: Field[];
  defaults?: Record<string, unknown>;
}
const status: Field = {
  key: "status",
  label: "Status",
  type: "select",
  options: ["draft", "active", "archived"],
};
const priority: Field = { key: "priority", label: "Priority", type: "number" };
const configs: Record<string, Config> = {
  "/categories": {
    title: "Categories",
    eyebrow: "Catalog",
    detail: "Men, Women, Kids and extensible clothing taxonomy.",
    endpoint: "/admin/categories",
    columns: [
      ["name", "Name"],
      ["audience", "Audience"],
      ["slug", "Slug"],
      ["sortOrder", "Order"],
    ],
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "slug", label: "Slug", required: true },
      {
        key: "audience",
        label: "Audience",
        type: "select",
        options: ["men", "women", "kids", "unisex"],
      },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    defaults: { sortOrder: 0 },
  },
  "/collections": {
    title: "Collections",
    eyebrow: "Merchandising",
    detail: "Curated and scheduled product edits.",
    endpoint: "/admin/collections",
    columns: [
      ["name", "Name"],
      ["collectionType", "Type"],
      ["status", "Status"],
      ["priority", "Priority"],
    ],
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "slug", label: "Slug", required: true },
      {
        key: "collectionType",
        label: "Type",
        type: "select",
        options: [
          "curated",
          "seasonal",
          "new_arrivals",
          "trending",
          "best_sellers",
          "deals",
        ],
      },
      status,
      priority,
    ],
    defaults: { collectionType: "curated", status: "draft", priority: 0 },
  },
  "/campaigns": {
    title: "Campaigns",
    eyebrow: "Merchandising",
    detail: "Seasonal and festival publication windows.",
    endpoint: "/admin/campaigns",
    columns: [
      ["name", "Name"],
      ["slug", "Slug"],
      ["status", "Status"],
      ["priority", "Priority"],
    ],
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "slug", label: "Slug", required: true },
      status,
      priority,
    ],
    defaults: { status: "draft", priority: 0 },
  },
  "/promotions": {
    title: "Promotions",
    eyebrow: "Merchandising",
    detail: "Offers, codes, scopes and schedules.",
    endpoint: "/admin/promotions",
    columns: [
      ["name", "Name"],
      ["code", "Code"],
      ["discountType", "Type"],
      ["discountValue", "Value"],
      ["status", "Status"],
    ],
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "code", label: "Code" },
      {
        key: "discountType",
        label: "Discount type",
        type: "select",
        options: ["percentage", "fixed_amount"],
        required: true,
      },
      {
        key: "discountValue",
        label: "Discount value",
        type: "number",
        required: true,
      },
      status,
      priority,
    ],
    defaults: {
      discountType: "percentage",
      discountValue: 10,
      status: "draft",
      priority: 0,
    },
  },
  "/banners": {
    title: "Banners",
    eyebrow: "Content",
    detail: "Responsive internal campaign creative by placement.",
    endpoint: "/admin/banners",
    columns: [
      ["name", "Name"],
      ["placement", "Placement"],
      ["status", "Status"],
      ["priority", "Priority"],
    ],
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "placement", label: "Placement", required: true },
      { key: "headline", label: "Headline" },
      {
        key: "desktopImageUrl",
        label: "Desktop image URL",
        type: "url",
        required: true,
      },
      { key: "mobileImageUrl", label: "Mobile image URL", type: "url" },
      { key: "altText", label: "Accessible image description", required: true },
      status,
      priority,
    ],
    defaults: { placement: "homepage_hero", status: "draft", priority: 0 },
  },
  "/homepage": {
    title: "Homepage layout",
    eyebrow: "Content",
    detail: "Published homepage compositions and section order.",
    endpoint: "/admin/homepage-layouts",
    columns: [
      ["name", "Name"],
      ["slug", "Slug"],
      ["status", "Status"],
      ["priority", "Priority"],
    ],
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "slug", label: "Slug", required: true },
      status,
      priority,
    ],
    defaults: { status: "draft", priority: 0 },
  },
  "/recommendations": {
    title: "Recommendation rules",
    eyebrow: "Merchandising",
    detail: "Explainable deterministic placement strategies.",
    endpoint: "/admin/recommendation-rules",
    columns: [
      ["name", "Name"],
      ["placement", "Placement"],
      ["strategy", "Strategy"],
      ["status", "Status"],
      ["priority", "Priority"],
    ],
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "placement", label: "Placement", required: true },
      {
        key: "strategy",
        label: "Strategy",
        type: "select",
        options: [
          "manual",
          "merchandised",
          "best_sellers",
          "trending",
          "personalized",
        ],
        required: true,
      },
      { key: "explanation", label: "Explanation", required: true },
      { key: "resultLimit", label: "Result limit", type: "number" },
      status,
      priority,
    ],
    defaults: {
      placement: "homepage",
      strategy: "merchandised",
      explanation: "Selected by the Mercury merchandising team.",
      resultLimit: 8,
      status: "draft",
      priority: 0,
    },
  },
  "/orders": {
    title: "Orders",
    eyebrow: "Operations",
    detail: "Order lifecycle, fulfilment and returns.",
    endpoint: "/admin/orders",
    columns: [
      ["id", "Order"],
      ["status", "Status"],
      ["total", "Total"],
      ["createdAt", "Created"],
    ],
  },
  "/customers": {
    title: "Customers",
    eyebrow: "Relationships",
    detail: "Customer accounts and order activity.",
    endpoint: "/admin/customers",
    columns: [
      ["email", "Email"],
      ["status", "Status"],
      ["orderCount", "Orders"],
      ["createdAt", "Joined"],
    ],
  },
  "/analytics": {
    title: "Analytics",
    eyebrow: "Performance",
    detail: "Live store performance from Mercury.",
    endpoint: "/admin/analytics/summary",
    columns: [],
  },
  "/team": {
    title: "Team & roles",
    eyebrow: "Access",
    detail: "Backoffice identities and precise permissions.",
    endpoint: "/admin/users",
    columns: [
      ["email", "Email"],
      ["status", "Status"],
      ["roles", "Roles"],
      ["createdAt", "Created"],
    ],
  },
  "/activity": {
    title: "Activity log",
    eyebrow: "Accountability",
    detail: "Chronological changes across the store.",
    endpoint: "/admin/audit",
    columns: [
      ["action", "Action"],
      ["resourceType", "Resource"],
      ["actorEmail", "Actor"],
      ["createdAt", "At"],
    ],
  },
  "/settings": {
    title: "Store settings",
    eyebrow: "Configuration",
    detail: "Brand identity, India locale, INR and tax defaults.",
    endpoint: "/admin/settings/store",
    columns: [],
    fields: [
      { key: "storeName", label: "Store name", required: true },
      { key: "defaultCurrency", label: "Currency", required: true },
      { key: "countryCode", label: "Country code", required: true },
      { key: "timezone", label: "Timezone", required: true },
      { key: "locale", label: "Locale", required: true },
      { key: "supportEmail", label: "Support email" },
      { key: "supportMobile", label: "Support mobile" },
    ],
  },
};
function shown(row: Record<string, unknown>, key: string) {
  const value = row[key];
  if (Array.isArray(value)) return value.join(", ");
  if (value == null) return "—";
  if (typeof value === "object") return JSON.stringify(value);
  if (key.toLowerCase().includes("at")) {
    const date = new Date(String(value));
    if (!Number.isNaN(date.getTime()))
      return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
        date,
      );
  }
  return String(value);
}
export function ModulePage() {
  const location = useLocation(),
    config = configs[location.pathname],
    { hasAnyRole } = useAuth(),
    canWrite = hasAnyRole("backend_write", "backend_admin"),
    cache = useQueryClient();
  const [editing, setEditing] = useState<
      Record<string, unknown> | null | undefined
    >(),
    [form, setForm] = useState<Record<string, unknown>>({}),
    [formError, setFormError] = useState("");
  useEffect(() => {
    document.title = `${config?.title ?? "Page not found"} — Mercury Backoffice`;
  }, [config]);
  const query = useQuery({
    queryKey: ["admin-module", location.pathname],
    enabled: Boolean(config),
    queryFn: ({ signal }) => api<unknown>(config!.endpoint, { signal }),
  });
  const save = useMutation({
    mutationFn: () =>
      api(
        location.pathname === "/settings" ? config.endpoint : editing ? `${config.endpoint}/${String(editing.id)}` : config.endpoint,
        {
          method: editing || location.pathname === "/settings" ? "PATCH" : "POST",
          body: JSON.stringify(
            Object.fromEntries(
              Object.entries(form).map(([key, value]) => [
                key,
                config.fields?.find((field) => field.key === key)?.type ===
                "number"
                  ? Number(value)
                  : value || null,
              ]),
            ),
          ),
        },
      ),
    onSuccess: async () => {
      await cache.invalidateQueries({
        queryKey: ["admin-module", location.pathname],
      });
      setEditing(undefined);
    },
    onError: (error) =>
      setFormError(
        error instanceof ApiError
          ? error.message
          : "This record could not be saved.",
      ),
  });
  if (!config)
    return (
      <PageHeader
        title="Page not found"
        eyebrow="404"
        description="This page does not exist."
      />
    );
  const raw = query.data,
    rows = Array.isArray(raw)
      ? raw
      : raw &&
          typeof raw === "object" &&
          Array.isArray((raw as { items?: unknown }).items)
        ? (raw as { items: unknown[] }).items
        : [];
  function open(row: Record<string, unknown> | null) {
    setEditing(row);
    setForm(
      row
        ? Object.fromEntries(
            (config.fields ?? []).map((field) => [
              field.key,
              row[field.key] ?? "",
            ]),
          )
        : { ...config.defaults },
    );
    setFormError("");
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    const missing = config.fields?.find(
      (field) => field.required && !String(form[field.key] ?? "").trim(),
    );
    if (missing) {
      setFormError(`${missing.label} is required.`);
      return;
    }
    save.mutate();
  }
  const action = location.pathname === "/settings" ? (
    <Button variant="contained" startIcon={<EditOutlined/>} disabled={!canWrite||!raw||typeof raw!=="object"} onClick={()=>open(raw as Record<string,unknown>)}>Edit settings</Button>
  ) : config.fields ? (
    <Tooltip
      title={
        canWrite ? "Create a record" : "You need a merchandising editor role"
      }
    >
      <span>
        <Button
          variant="contained"
          startIcon={<Add />}
          disabled={!canWrite}
          onClick={() => open(null)}
        >
          Add record
        </Button>
      </span>
    </Tooltip>
  ) : (
    <Button startIcon={<Refresh />} onClick={() => void query.refetch()}>
      Refresh
    </Button>
  );
  return (
    <>
      <PageHeader
        title={config.title}
        eyebrow={config.eyebrow}
        description={config.detail}
        action={action}
      />
      <Card sx={{ minHeight: 360 }}>
        {query.isLoading ? (
          <Box sx={{ height: 360, display: "grid", placeItems: "center" }}>
            <CircularProgress />
          </Box>
        ) : query.isError ? (
          <Alert severity="error">{config.title} could not be loaded.</Alert>
        ) : config.columns.length ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {config.columns.map(([, label]) => (
                    <TableCell key={label}>{label}</TableCell>
                  ))}
                  {config.fields && (
                    <TableCell align="right">Actions</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((item, index) => {
                  const row = item as Record<string, unknown>;
                  return (
                    <TableRow key={String(row.id ?? index)}>
                      {config.columns.map(([key, label]) => (
                        <TableCell key={label}>{shown(row, key)}</TableCell>
                      ))}
                      {config.fields && (
                        <TableCell align="right">
                          <IconButton
                            aria-label={`Edit ${String(row.name ?? "record")}`}
                            disabled={!canWrite}
                            onClick={() => open(row)}
                          >
                            <EditOutlined />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                {!rows.length && (
                  <TableRow>
                    <TableCell
                      colSpan={config.columns.length + 1}
                      align="center"
                      sx={{ py: 8 }}
                    >
                      <Typography variant="h3">No records yet</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ p: 3 }}>
            <Typography>
              {raw && typeof raw === "object"
                ? JSON.stringify(raw)
                : "No configuration returned."}
            </Typography>
          </Box>
        )}
      </Card>
      <Dialog
        open={editing !== undefined}
        onClose={() => setEditing(undefined)}
        fullWidth
        maxWidth="sm"
      >
        <form noValidate onSubmit={submit}>
          <DialogTitle>{editing ? "Edit" : "Create"} record</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              {formError && <Alert severity="error">{formError}</Alert>}
              {config.fields?.map((field) =>
                field.type === "select" ? (
                  <TextField
                    key={field.key}
                    select
                    label={field.label}
                    value={String(form[field.key] ?? "")}
                    onChange={(event) =>
                      setForm({ ...form, [field.key]: event.target.value })
                    }
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option.replaceAll("_", " ")}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    key={field.key}
                    label={field.label}
                    type={
                      field.type === "number"
                        ? "number"
                        : field.type === "url"
                          ? "url"
                          : "text"
                    }
                    value={String(form[field.key] ?? "")}
                    onChange={(event) =>
                      setForm({ ...form, [field.key]: event.target.value })
                    }
                  />
                ),
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditing(undefined)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={save.isPending}>
              {save.isPending ? (
                <CircularProgress size={20} />
              ) : editing ? (
                "Save changes"
              ) : (
                "Create"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

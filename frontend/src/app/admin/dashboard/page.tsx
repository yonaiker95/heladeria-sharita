export default function AdminDashboard() {
  return (
    <div
      style={{
        padding: 'clamp(16px, 4vw, 24px)',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 'clamp(24px, 5vw, 32px)' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(24px, 6vw, 30px)',
                  fontWeight: '700',
                  color: '#111827',
                  margin: '0',
                }}
              >
                Dashboard
              </h1>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  width: '100%',
                }}
              >
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    margin: '0',
                  }}
                >
                  Bienvenido de vuelta, aquí tienes un resumen de tu heladería
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      color: '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                    }}
                  >
                    <svg
                      style={{
                        width: 'clamp(14px, 3vw, 16px)',
                        height: 'clamp(14px, 3vw, 16px)',
                        flexShrink: '0',
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date().toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <button
                    style={{
                      padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg
                      style={{
                        width: 'clamp(14px, 3vw, 16px)',
                        height: 'clamp(14px, 3vw, 16px)',
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(16px, 4vw, 24px)',
          marginBottom: 'clamp(24px, 5vw, 32px)',
        }}
      >
        {[
          {
            title: 'Ventas Hoy',
            value: '$1,250.50',
            change: '+12.5%',
            color: '#10b981',
            icon: '💰',
          },
          {
            title: 'Pedidos Pendientes',
            value: '8',
            change: '+2 nuevos',
            color: '#3b82f6',
            icon: '🛒',
          },
          {
            title: 'Productos en Stock',
            value: '156',
            change: '-3 bajos',
            color: '#8b5cf6',
            icon: '📦',
          },
          {
            title: 'Clientes Nuevos',
            value: '24',
            change: '+8.7%',
            color: '#ec4899',
            icon: '👥',
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: 'clamp(16px, 4vw, 24px)',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <div style={{ flex: '1', minWidth: '0' }}>
                <p
                  style={{
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    color: '#6b7280',
                    fontWeight: '500',
                    marginBottom: 'clamp(4px, 1vw, 8px)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stat.title}
                </p>
                <p
                  style={{
                    fontSize: 'clamp(22px, 5vw, 30px)',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: 'clamp(4px, 1vw, 8px)',
                    lineHeight: '1.2',
                  }}
                >
                  {stat.value}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span
                    style={{
                      color: stat.change.includes('+') ? '#10b981' : '#ef4444',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: 'clamp(40px, 10vw, 48px)',
                  height: 'clamp(40px, 10vw, 48px)',
                  borderRadius: '12px',
                  backgroundColor: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 'clamp(20px, 5vw, 24px)',
                  flexShrink: '0',
                }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables - Responsive Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(16px, 4vw, 24px)',
          marginBottom: 'clamp(24px, 5vw, 32px)',
        }}
      >
        {/* Sales Chart */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: 'clamp(16px, 4vw, 24px)',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            minWidth: '0',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 'clamp(16px, 4vw, 24px)',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(18px, 4vw, 20px)',
                fontWeight: '700',
                color: '#111827',
                margin: '0',
              }}
            >
              Ventas de la Semana
            </h2>
            <div
              style={{
                width: 'clamp(20px, 5vw, 24px)',
                height: 'clamp(20px, 5vw, 24px)',
                color: '#3b82f6',
              }}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>

          {/* Responsive Bar Chart */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 'clamp(6px, 2vw, 12px)',
              height: 'clamp(120px, 25vw, 160px)',
              marginTop: 'clamp(16px, 4vw, 32px)',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}
          >
            {[
              { day: 'Lun', amount: 1200, percent: 80 },
              { day: 'Mar', amount: 800, percent: 60 },
              { day: 'Mié', amount: 1500, percent: 100 },
              { day: 'Jue', amount: 1000, percent: 70 },
              { day: 'Vie', amount: 1800, percent: 90 },
              { day: 'Sáb', amount: 2000, percent: 95 },
              { day: 'Dom', amount: 1600, percent: 85 },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  flex: '1',
                  minWidth: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 'clamp(30px, 8vw, 75%)',
                    height: `${item.percent}%`,
                    background: 'linear-gradient(to top, #3b82f6, #8b5cf6)',
                    borderRadius: '6px 6px 0 0',
                    minHeight: '20px',
                  }}
                />
                <span
                  style={{
                    marginTop: 'clamp(4px, 1vw, 8px)',
                    fontSize: 'clamp(10px, 2.5vw, 12px)',
                    color: '#6b7280',
                  }}
                >
                  {item.day}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(10px, 2.5vw, 12px)',
                    fontWeight: '500',
                    color: '#374151',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                  }}
                >
                  ${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 'clamp(16px, 4vw, 32px)',
              paddingTop: 'clamp(16px, 4vw, 24px)',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 'clamp(12px, 3vw, 14px)',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <span style={{ color: '#6b7280' }}>Total semanal:</span>
              <span
                style={{
                  fontWeight: '700',
                  color: '#111827',
                  fontSize: 'clamp(14px, 3.5vw, 16px)',
                }}
              >
                $9,900.00
              </span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: 'clamp(16px, 4vw, 24px)',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            minWidth: '0',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 'clamp(16px, 4vw, 24px)',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(18px, 4vw, 20px)',
                fontWeight: '700',
                color: '#111827',
                margin: '0',
              }}
            >
              Pedidos Recientes
            </h2>
            <div
              style={{
                width: 'clamp(20px, 5vw, 24px)',
                height: 'clamp(20px, 5vw, 24px)',
                color: '#3b82f6',
              }}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(12px, 3vw, 16px)',
              maxHeight: '300px',
              overflowY: 'auto',
              paddingRight: '8px',
            }}
          >
            {[
              {
                id: '#00123',
                customer: 'Juan Pérez',
                total: '$45.50',
                status: 'Completado',
                time: '10 min',
              },
              {
                id: '#00124',
                customer: 'María García',
                total: '$32.75',
                status: 'En preparación',
                time: '25 min',
              },
              {
                id: '#00125',
                customer: 'Carlos López',
                total: '$67.80',
                status: 'Pendiente',
                time: '1 hora',
              },
              {
                id: '#00126',
                customer: 'Ana Rodríguez',
                total: '$28.90',
                status: 'Completado',
                time: '2 horas',
              },
            ].map((order, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: 'clamp(12px, 3vw, 16px)',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'clamp(8px, 2vw, 16px)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(8px, 2vw, 16px)',
                      minWidth: '0',
                    }}
                  >
                    <div
                      style={{
                        width: 'clamp(32px, 8vw, 40px)',
                        height: 'clamp(32px, 8vw, 40px)',
                        backgroundColor: '#dbeafe',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: '0',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'clamp(16px, 4vw, 20px)',
                          lineHeight: '1',
                        }}
                      >
                        🍦
                      </span>
                    </div>
                    <div style={{ minWidth: '0', flex: '1' }}>
                      <p
                        style={{
                          fontWeight: '500',
                          color: '#111827',
                          fontSize: 'clamp(14px, 3vw, 16px)',
                          margin: '0 0 4px 0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {order.id}
                      </p>
                      <p
                        style={{
                          fontSize: 'clamp(12px, 3vw, 14px)',
                          color: '#6b7280',
                          margin: '0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {order.customer}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <p
                    style={{
                      fontWeight: '500',
                      color: '#111827',
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      margin: '0',
                    }}
                  >
                    {order.total}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(6px, 2vw, 8px)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'clamp(10px, 2.5vw, 12px)',
                        padding: 'clamp(3px, 1vw, 4px) clamp(6px, 2vw, 8px)',
                        borderRadius: '9999px',
                        backgroundColor:
                          order.status === 'Completado'
                            ? '#d1fae5'
                            : order.status === 'En preparación'
                            ? '#fef3c7'
                            : '#fee2e2',
                        color:
                          order.status === 'Completado'
                            ? '#065f46'
                            : order.status === 'En preparación'
                            ? '#92400e'
                            : '#991b1b',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {order.status}
                    </span>
                    <span
                      style={{
                        fontSize: 'clamp(10px, 2.5vw, 12px)',
                        color: '#6b7280',
                      }}
                    >
                      {order.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            style={{
              width: '100%',
              marginTop: 'clamp(16px, 4vw, 24px)',
              padding: 'clamp(10px, 3vw, 12px)',
              textAlign: 'center',
              color: '#2563eb',
              fontWeight: '500',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: 'clamp(12px, 3vw, 14px)',
            }}
          >
            Ver todos los pedidos
          </button>
        </div>
      </div>

      {/* Popular Products and Alerts - Responsive Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(16px, 4vw, 24px)',
        }}
      >
        {/* Popular Products */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: 'clamp(16px, 4vw, 24px)',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            minWidth: '0',
            overflow: 'hidden',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(18px, 4vw, 20px)',
              fontWeight: '700',
              color: '#111827',
              marginBottom: 'clamp(16px, 4vw, 24px)',
              marginTop: '0',
            }}
          >
            Productos Más Vendidos
          </h2>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {[
              {
                name: 'Helado de Vainilla',
                sales: 142,
                stock: 45,
                color: '#fef3c7',
              },
              {
                name: 'Helado de Chocolate',
                sales: 128,
                stock: 32,
                color: '#d6d3d1',
              },
              {
                name: 'Helado de Fresa',
                sales: 98,
                stock: 28,
                color: '#fce7f3',
              },
              {
                name: 'Cono Mixto',
                sales: 76,
                stock: 15,
                color: '#dbeafe',
              },
            ].map((product, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: 'clamp(10px, 3vw, 12px)',
                  borderRadius: '8px',
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'clamp(8px, 2vw, 12px)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(8px, 2vw, 12px)',
                      minWidth: '0',
                      flex: '1',
                    }}
                  >
                    <div
                      style={{
                        width: 'clamp(32px, 8vw, 40px)',
                        height: 'clamp(32px, 8vw, 40px)',
                        backgroundColor: product.color,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: '0',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'clamp(16px, 4vw, 20px)',
                          lineHeight: '1',
                        }}
                      >
                        🍦
                      </span>
                    </div>
                    <div style={{ minWidth: '0', flex: '1' }}>
                      <p
                        style={{
                          fontWeight: '500',
                          color: '#111827',
                          fontSize: 'clamp(14px, 3vw, 16px)',
                          margin: '0 0 4px 0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {product.name}
                      </p>
                      <p
                        style={{
                          fontSize: 'clamp(12px, 3vw, 14px)',
                          color: '#6b7280',
                          margin: '0',
                        }}
                      >
                        {product.sales} ventas
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ fontSize: 'clamp(12px, 3vw, 14px)' }}>
                    <span style={{ color: '#6b7280' }}>Stock: </span>
                    <span
                      style={{
                        fontWeight: '500',
                        color: product.stock < 20 ? '#dc2626' : '#059669',
                      }}
                    >
                      {product.stock} unidades
                    </span>
                  </div>
                  <svg
                    style={{
                      width: 'clamp(14px, 3vw, 16px)',
                      height: 'clamp(14px, 3vw, 16px)',
                      color: '#9ca3af',
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: 'clamp(16px, 4vw, 24px)',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            minWidth: '0',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 'clamp(16px, 4vw, 24px)',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(18px, 4vw, 20px)',
                fontWeight: '700',
                color: '#111827',
                margin: '0',
              }}
            >
              Alertas del Sistema
            </h2>
            <div
              style={{
                width: 'clamp(20px, 5vw, 24px)',
                height: 'clamp(20px, 5vw, 24px)',
                color: '#f59e0b',
              }}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div
              style={{
                padding: 'clamp(12px, 3vw, 16px)',
                backgroundColor: '#fffbeb',
                border: '1px solid #fcd34d',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(8px, 2vw, 12px)',
                }}
              >
                <div
                  style={{
                    width: 'clamp(18px, 4vw, 20px)',
                    height: 'clamp(18px, 4vw, 20px)',
                    color: '#d97706',
                    flexShrink: '0',
                    marginTop: '2px',
                  }}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div style={{ minWidth: '0', flex: '1' }}>
                  <p
                    style={{
                      fontWeight: '500',
                      color: '#92400e',
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      margin: '0 0 4px 0',
                    }}
                  >
                    Stock Bajo
                  </p>
                  <p
                    style={{
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      color: '#92400e',
                      margin: '0',
                      lineHeight: '1.4',
                    }}
                  >
                    3 productos están por debajo del nivel mínimo de stock
                  </p>
                  <button
                    style={{
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      color: '#d97706',
                      fontWeight: '500',
                      marginTop: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0',
                      textAlign: 'left',
                    }}
                  >
                    Revisar inventario →
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: 'clamp(12px, 3vw, 16px)',
                backgroundColor: '#eff6ff',
                border: '1px solid #93c5fd',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(8px, 2vw, 12px)',
                }}
              >
                <div
                  style={{
                    width: 'clamp(18px, 4vw, 20px)',
                    height: 'clamp(18px, 4vw, 20px)',
                    color: '#2563eb',
                    flexShrink: '0',
                    marginTop: '2px',
                  }}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div style={{ minWidth: '0', flex: '1' }}>
                  <p
                    style={{
                      fontWeight: '500',
                      color: '#1e40af',
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      margin: '0 0 4px 0',
                    }}
                  >
                    Pedidos Pendientes
                  </p>
                  <p
                    style={{
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      color: '#1e40af',
                      margin: '0',
                      lineHeight: '1.4',
                    }}
                  >
                    2 pedidos requieren atención inmediata
                  </p>
                  <button
                    style={{
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      color: '#2563eb',
                      fontWeight: '500',
                      marginTop: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0',
                      textAlign: 'left',
                    }}
                  >
                    Ver pedidos →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div
        style={{
          marginTop: 'clamp(24px, 5vw, 32px)',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: 'clamp(16px, 4vw, 24px)',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'clamp(8px, 2vw, 12px)',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(12px, 3vw, 14px)',
              color: '#6b7280',
              margin: '0',
            }}
          >
            Resumen del día
          </p>
          <p
            style={{
              fontSize: 'clamp(16px, 4vw, 18px)',
              fontWeight: '500',
              color: '#111827',
              margin: '0',
              lineHeight: '1.4',
            }}
          >
            ¡Excelente día! Has superado las ventas del día anterior.
          </p>
          <button
            style={{
              marginTop: 'clamp(8px, 2vw, 16px)',
              padding: 'clamp(10px, 3vw, 12px) clamp(16px, 4vw, 24px)',
              background: 'linear-gradient(to right, #10b981, #059669)',
              color: 'white',
              fontWeight: '500',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(12px, 3vw, 14px)',
              whiteSpace: 'nowrap',
            }}
          >
            Generar Reporte Diario
          </button>
        </div>
      </div>
    </div>
  );
}